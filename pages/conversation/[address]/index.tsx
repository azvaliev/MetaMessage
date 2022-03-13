import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native-web";
import Message from "../../../components/UI/conversation/Message";
import ComposeMessageField from "../../../components/UI/conversation/ComposeMessageField";
import AlertMessage from "../../../components/UI/AlertMessage";
import { Props, MessageObj } from "../../../components/types";
import { ShortenPubkey } from "../../../components/UI/Shorten";
import copy from "copy-to-clipboard";
import CheckSendMessage from "../../../components/Logic/messaging/outgoing/CheckSendMessage";
import IsMobile from "../../../components/Logic/IsMobile";
import { CloseConvBtn } from "../../../components/UI/option_bar/StyledOptionBar";

export default function Conversation(props: Props) {
  const router = useRouter();
  const { address } = router.query;
  const [activeConversation, setActiveConversation] = useState([]);
  const [messageContents, setMessageContents] = useState("");
  const [height, setHeight] = useState("79vh");
  const [theAlertMessage, setTheAlertMessage] = useState({
    message: "",
    warning: true,
  });
  const [displayAddress, setDisplayAddress] = useState(address);

  const scrollRef = useRef(null);

  useEffect(() => {
    // Handle error if prior conversations do not exist
    try {
      console.log(props.conversations);
      props.conversations.forEach((conversation: Array<MessageObj>) => {
        conversation.forEach((message: MessageObj) => {
          if (message.to === address || message.from === address) {
            setActiveConversation(conversation);
            setDisplayAddress(ShortenPubkey(message.from, false, props.mobile));
          }
        });
      });
    } catch {
      setDisplayAddress(ShortenPubkey(address.toString(), false, props.mobile));
      setActiveConversation([]);
    }
    const stayUp = setInterval(() => {
      window.scrollTo(0, 0);
    }, 2);
    return () => {
      clearInterval(stayUp);
    };
  }, [props.conversations]);

  const heightCheck = () => {
    if (props.mobile) {
      setHeight("87vh");
    } else {
      setHeight("79vh");
    }
  };

  useEffect(() => {
    heightCheck();
    scrollRef.current.scrollToEnd({ animated: false });
    setTimeout(() => {
      IsMobile() ? setHeight("79vh") : setHeight("87vh");
      scrollRef.current.scrollToEnd({ animated: false });
    }, 30);
  }, []);

  async function handleSendMessage() {
    sendAlert("Sending...", false);
    setMessageContents("");
    let result = await CheckSendMessage(
      messageContents,
      address.toString(),
      props.keypair
    );
    if (result.warning) {
      sendAlert(result.alertMsg, result.warning);
    }
    await props.onUpdateNeeded();
    setTimeout(() => {
      scrollRef.current.scrollToEnd({ animated: false });
    }, 5);
  }
  const handleTypingMessage = (e) => {
    setMessageContents(e.target.value);
  };

  const onFocus = () => {
    if (props.mobile) {
      setHeight("45vh");
    }
  };
  const onBlur = () => {
    if (props.mobile) {
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
          {activeConversation.map((conversation, i) => {
            if (activeConversation.length === i + 1) {
              return (
                <Message
                  from={conversation.from === address ? true : false}
                  message={conversation.message}
                  showDate={true}
                  date={conversation.date}
                />
              );
            } else {
              return (
                <Message
                  from={conversation.from === address ? true : false}
                  message={conversation.message}
                  showDate={false}
                  date={conversation.date}
                />
              );
            }
          })}
        </ScrollView>
        <ComposeMessageField
          mobile={props.mobile}
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
