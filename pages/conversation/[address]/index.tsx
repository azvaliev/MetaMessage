import { useRouter } from "next/router";
import { useEffect, useState, useRef, useContext } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native-web";
import Message from "../../../components/conversation/Message";
import ComposeMessageField from "../../../components/conversation/ComposeMessageField";
import AlertMessage from "../../../components/AlertMessage";
import { MessageObj } from "../../../lib/types";
import { ShortenPubkey } from "../../../components/Shorten";
import copy from "copy-to-clipboard";
import checkSendMessage from "../../../lib/messaging/out/checkSendMessage";
import { CloseConvBtn } from "../../../components/option_bar/StyledOptionBar";
import getMessage from "../../../lib/messaging/in/getMessage";
import handleRedirect from "../../../lib/account/handleRedirect";
import sendReadReceipt from "../../../lib/messaging/out/sendReadReceipt";
import { UserContext } from "../../../lib/UserContext";

export default function Conversation() {

	const { keypair, mobile, conversations } = useContext(UserContext);

	const router = useRouter();
	const { address } = router.query;
	const [activeConversation, setActiveConversation] = useState<Array<MessageObj>>([]);
	const [messageContents, setMessageContents] = useState("");
	const [height, setHeight] = useState("79vh");
	const [theAlertMessage, setTheAlertMessage] = useState({
		message: "",
		warning: true,
	});
	const [displayAddress, setDisplayAddress] = useState(address);


	const scrollRef = useRef(null);

	useEffect(() => {
		// Send user to login/signup if no keypair
		if (keypair === null) {
			router.push(handleRedirect());
		}

		// Handle error if prior conversations do not exist
		try {
			const activeConvEncoded = conversations[address.toString()];

			setDisplayAddress(ShortenPubkey(address.toString(), false, mobile));
			Promise.all(activeConvEncoded.map(async (message: MessageObj) => {
				return await getMessage(message.messageID.toString());
			})).then(res => {
				console.log(res);
				setActiveConversation(() => 
					activeConvEncoded.map((message, i) => (
						{...message, messageContents: res[i]})
					)
				);
			});
			
		} catch (e) {
			console.error(e);
			setDisplayAddress(ShortenPubkey(address.toString(), false, mobile));
			setActiveConversation([]);
		}
		const stayUp = setInterval(() => {
			window.scrollTo(0, 0);
		}, 2);

		return () => {
			clearInterval(stayUp);
			// Send read reciepts for messages viewed
			Promise.all(activeConversation.map(async message => {
				return await sendReadReceipt(keypair, message);	
			}));
		};
	}, [conversations]);
  

	const heightCheck = () => {
		if (mobile) {
			setHeight("87vh");
		} else {
			setHeight("79vh");
		}
	};

	useEffect(() => {
		heightCheck();
		scrollRef.current.scrollToEnd({ animated: true });
		setTimeout(() => {
			mobile ? setHeight("79vh") : setHeight("87vh");
			scrollRef.current.scrollToEnd({ animated: true });
		}, 30);
	}, []);

	async function handleSendMessage() {
		sendAlert("Sending...", false);
		setMessageContents("");
		const result = await checkSendMessage(
			messageContents,
			address.toString(),
			keypair
		);
		if (result.warning) {
			sendAlert(result.alertMsg, result.warning);
		}
		setTimeout(() => {
			scrollRef.current.scrollToEnd({ animated: false });
		}, 5);
	}
	const handleTypingMessage = (e) => {
		setMessageContents(e.target.value);
	};

	const onFocus = () => {
		if (mobile) {
			setHeight("45vh");
		}
	};
	const onBlur = () => {
		if (mobile) {
			setHeight("80vh");
		}
	};
	const sendAlert = (message: string, warning: boolean) => {
		setTheAlertMessage({ message: message, warning: warning });
		setTimeout(() => {
			setTheAlertMessage({
				message: "",
				warning: true,
			});
		}, 7500);
	};
	const closeConversation = () => {
		router.push("/");
	};


	return (
		<div className="h-screen max-h-screen overflow-y-hidden bg-smoke my-0 mx-auto w-[95%] lg:w-[65%] lg:mx-auto">
			<CloseConvBtn onClick={closeConversation}>
        &#x2715;
			</CloseConvBtn>
			<div
				className="border-b-2 border-white flex flex-row"
				style={{
					padding: "2vh 0",
				}}
			>
				<h1
					onClick={() => copy(address.toString())}
					className="text-left md:text-center ml-1 md:mx-auto text-3xl text-white"
				>
					{displayAddress}
				</h1>
			</div>
			<KeyboardAvoidingView
				style={{ height: height }}
				nativeID="main-conversation"
			>
				<ScrollView ref={scrollRef} nativeID="div-scroll-conv">
					{activeConversation.map((message: MessageObj, i) => {
						if (!message.messageContents) {
							return null;
						}
						if (activeConversation.length === i + 1) {
							return (
								<Message
									from={message.sender.toString() === address ? true : false}
									message={message.messageContents}
									showDate={true}
									date={new Date}
									key={message.messageID.toString()}
								/>
							);
						} else {
							return (
								<Message
									from={message.sender.toString() === address ? true : false}
									message={""}
									showDate={false}
									date={new Date}
									key={message.messageID.toString()}
								/>
							);
						}
					})}
				</ScrollView>
				<ComposeMessageField
					mobile={mobile}
					message={messageContents}
					handleTypingMessage={handleTypingMessage}
					handleSendMessage={handleSendMessage}
					onBlur={onBlur}
					onFocus={onFocus}
				/>
			</KeyboardAvoidingView>
			<AlertMessage
				message={theAlertMessage.message}
				warning={theAlertMessage.warning}
				neutral={false}
			/>
		</div>
	);
}
