import {KeyboardAvoidingView, View} from "react-native-web";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ComposeMessageField from "../components/conversation/ComposeMessageField";
import AlertMessage from "../components/AlertMessage";
import checkSendMessage from "../lib/messaging/out/checkSendMessage";
import { useRouter } from "next/router";
import { UserContext } from "../lib/UserContext";

const Compose = () => {

	const {keypair, mobile} = useContext(UserContext);

	const [recipient, setRecipient] = useState("");
	const [message, setMessage] = useState("");
	const [theAlertMessage, setTheAlertMessage] = useState({
		message: "",
		warning: true,
	});
	const [height, setHeight] = useState("45vh");
	const router = useRouter();

	async function handleSendMessage() {
		setMessage("");
		sendAlert("Sending...", false);
		const result = await checkSendMessage(message, recipient, keypair);
		if (!result.warning) {
			router.push("/conversation/[address]", `/conversation/${recipient}`);
		} else {
			sendAlert(result.alertMsg, result.warning);
		}
	}
	const sendAlert = (message: string, warning: boolean) => {
		setTheAlertMessage({message: message, warning: warning});
		setTimeout(() => {
			setTheAlertMessage({
				message: "",
				warning: true,
			});
		}, 7500);
	};

	const handleTypingMessage = (e) => {
		setMessage(e.target.value);
	};

	const handleTypingRecipient = (e) => {
		setRecipient(e.target.value);
	};

	useEffect(() => {
		const stayup = setInterval(() => {
			window.scrollTo(0, 0);
		}, 1);
		if (!mobile) {
			setHeight("85vh");
		}
		return () => {
			clearInterval(stayup);
		};
	}, []);
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

	return (
		<div
			className="mx-2 bg-smoke lg:w-3/4 lg:mx-auto"
			style={{height: "90vh"}}
		>
			<div className="z-20">
				<Link href="/">
					<h5
						className="z-20 ml-auto text-white w-fit"
						style={{
							fontSize: "4.5rem",
							lineHeight: "1",
							marginRight: "2%",
						}}
					>
						&#x2715;
					</h5>
				</Link>
			</div>
			<div style={{color: "white", marginTop: "-4.7rem"}}>
				<h1
					className="z-0 text-3xl text-center text-white"
					id="newmessage"
					style={{
						paddingTop: "1.4rem",
						paddingBottom: "0.5rem",
					}}
				>
					New Message
				</h1>
			</div>
			<KeyboardAvoidingView
				style={{backgroundColor: "#100c08", height: height}}
			>
				<View
					style={{
						borderBottomWidth: "1px",
						borderTopWidth: "1px",
						borderColor: "grey",
						minHeight: "10vh",
						color: "white",
						marginTop: "2vh",
						marginLeft: "2%",
						marginRight: "2%",
					}}
				>
					<input className="focus:outline-none bg-transparent border-gray-300 mx-[2%] w-[96%]
                           text-3xl my-auto"
					autoFocus={true}
					onFocus={onFocus}
					onBlur={onBlur}
					value={recipient}
					onChange={handleTypingRecipient}
					placeholder="Recipient Address"
					/>
				</View>
				<ComposeMessageField
					mobile={mobile}
					handleSendMessage={handleSendMessage}
					message={message}
					handleTypingMessage={handleTypingMessage}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			</KeyboardAvoidingView>
			<AlertMessage
				message={theAlertMessage.message}
				warning={theAlertMessage.warning}
				neutral={false}
			/>
		</div>
	);
};

export default Compose;
