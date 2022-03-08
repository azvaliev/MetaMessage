import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { View, KeyboardAvoidingView, Text, ScrollView } from "react-native-web";
import Message from "../../../components/UI/Message";
import NativeComposeMessage from "../../../components/UI/NativeComposeMessage";
import SendMsg from "../../../components/Logic/SendMsg";
import AlertMessage from "../../../components/UI/AlertMessage";
import DesktopCompose from "../../../components/UI/DesktopCompose";
import { Props, MessageObj } from "../../../components/types";

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

  const scrollRef = useRef(null);

  useEffect(() => {
    props.conversations.forEach((conversation: Array<MessageObj>) => {
      conversation.forEach((message: MessageObj) => {
        if (message.from === address) {
          setActiveConversation(conversation);
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
      setHeight("90vh");
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
        let result = await SendMsg(messageContents, address[0], props.keypair);
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
    <View style={{ height: "100vh", backgroundColor: "black" }}>
      {props.mobile ? (
        <>
          <Text
            style={{
              color: "#2563EB",
              fontSize: "3.5rem",
              marginBottom: "-16%",
              zIndex: "20",
              marginLeft: "auto",
              marginRight: "4%",
            }}
            onClick={closeConversation}
          >
            &#x2715;
          </Text>
          <View
            style={{
              borderBottomWidth: "2px",
              borderColor: "white",
              paddingBottom: "2vh",
              paddingTop: "2vh",
              backgroundColor: "#100c08",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "left",
                marginLeft: "2%",
                fontSize: "1.875rem",
                lineHeight: "2.25rem",
              }}
            >
              {address}
            </Text>
          </View>
        </>
      ) : (
        <>
          <div
            className="flex -mb-18 ml-4 font-extrabold z-20 text-7xl text-blue-600"
            onClick={closeConversation}
          >
            &#x226A;
          </div>
          <div className="flex border-b-2 border-white py-2vh bg-smoke">
            <h1 className="mx-auto text-4xl text-white">{address}</h1>
          </div>
        </>
      )}
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
        {props.mobile ? (
          <NativeComposeMessage
            message={messageContents}
            handleTypingMessage={handleTypingMessage}
            handleSendMessage={handleSendMessage}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        ) : (
          <DesktopCompose
            extramargin={false}
            bottom="bottom-0"
            message={messageContents}
            handleTypingMessage={handleTypingMessage}
            handleSendMessage={handleSendMessage}
          />
        )}
      </KeyboardAvoidingView>
      <AlertMessage
        message={theAlertMessage.message}
        warning={theAlertMessage.warning}
        neutral={false}
      />
    </View>
  );
}
