import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { View, KeyboardAvoidingView, Text, ScrollView } from "react-native-web";
import Message from "../../../components/UI/Message";
import ComposeMessageField from "../../../components/UI/ComposeMessageField";
import SendMsg from "../../../components/Logic/SendMsg";
import AlertMessage from "../../../components/UI/AlertMessage";
import { Props, MessageObj } from "../../../components/types";
import { ShortenPubkey } from "../../../components/UI/Shorten";

export default function Conversation(props: Props) {
  const router = useRouter();
  const { address } = router.query;
  const [activeConversation, setActiveConversation] = useState([]);
  const [messageContents, setMessageContents] = useState("");
  const [height, setHeight] = useState("80vh");
  const [theAlertMessage, setTheAlertMessage] = useState({
    message: "",
    warning: true,
  });
  const [displayAddress, setDisplayAddress] = useState(address);

  const scrollRef = useRef(null);

  useEffect(() => {
    props.conversations.forEach((conversation: Array<MessageObj>) => {
      conversation.forEach((message: MessageObj) => {
        if (message.from === address) {
          setActiveConversation(conversation);
          setDisplayAddress(ShortenPubkey(message.from, false, props.mobile));
        }
      });
    });
    const stayUp = setInterval(() => {
      window.scrollTo(0, 0);
    }, 2);
    scrollRef.current.scrollToEnd({ animated: false });
    setTimeout(() => {
      scrollRef.current.scrollToEnd({ animated: false });
    }, 50);
    return () => {
      clearInterval(stayUp);
    };
  }, [props.conversations]);

  useEffect(() => {
    if (!props.mobile) {
      setHeight("87vh");
    }
  }, []);

  async function handleSendMessage() {
    if (messageContents.length < 1) {
      sendAlert("Message too short", true);
    } else {
      if (messageContents.length > 300) {
        sendAlert("Please shorten your message", true);
      } else {
        setMessageContents("");
        let result = await SendMsg(
          messageContents,
          address.toString(),
          props.keypair
        );
        if (result == "badkey") {
          sendAlert("Recipient address is invalid: Please Verify", true);
        } else if (result == "success") {
          props.onUpdateNeeded();
          sendAlert("Message Delivered", false);
        }
      }
    }
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
  const sendAlert = (message, warning) => {
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
    <div className="h-screen max-h-screen overflow-y-hidden bg-smoke main-conv lg:mx-auto">
      <h5 className="closeConvBtn" onClick={closeConversation}>
        &#x2715;
      </h5>
      <div
        className="border-b-2 border-white flex flex-row"
        style={{
          padding: "2vh 0",
        }}
      >
        <h1 className="text-left md:text-center ml-1 md:mx-auto text-3xl text-white">
          {displayAddress}
        </h1>
      </div>
      <KeyboardAvoidingView
        style={{ height: height }}
        nativeID="main-conversation"
      >
        <ScrollView
          ref={scrollRef}
          style={{
            marginLeft: "2%",
            marginRight: "2%",
          }}
        >
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
