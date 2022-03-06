import { KeyboardAvoidingView, View, TextInput, Text } from "react-native-web";
import Link from "next/link";
import { useEffect, useState } from "react";
import NativeComposeMessage from "../components/UI/NativeComposeMessage";
import SendMsg from "../components/Logic/SendMsg";
import AlertMessage from "../components/UI/AlertMessage";
import { Props } from "../components/types";

const Compose2 = (props: Props) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theAlertMessage, setTheAlertMessage] = useState({
    message: "",
    warning: true,
  });
  const [height, setHeight] = useState("45vh");

  async function handleSendMessage() {
    if (message.length < 1) {
      sendAlert("Message too short", true);
    } else {
      if (recipient.length < 32) {
        sendAlert("Please enter valid address", true);
      } else {
        if (message.length > 300) {
          sendAlert("Please shorten your message", true);
        } else {
          setMessage("");
          let result = await SendMsg(message, recipient, props.keypair);
          if (result == "badkey") {
            sendAlert("Recipient address is invalid: Please Verify", true);
          } else if (result == "success") {
            sendAlert("Message Delivered", false);
          }
        }
      }
    }
  }
  const sendAlert = (message: string, warning: boolean) => {
    setTheAlertMessage({ message: message, warning: warning });
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
    let stayup = setInterval(() => {
      window.scrollTo(0, 0);
    }, 1);
    if (!props.mobile) {
      setHeight("90vh");
    }
    return () => {
      clearInterval(stayup);
    };
  }, []);
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

  return (
    <View style={{ height: "90vh", backgroundColor: "black" }}>
      <View style={{ zIndex: "20" }}>
        <Link href="/">
          <Text
            style={{
              fontSize: "4.5rem",
              lineHeight: "1",
              marginLeft: "auto",
              marginRight: "2%",
              width: "fit-content",
              zIndex: "20",
              color: "white",
            }}
          >
            &#x2715;
          </Text>
        </Link>
      </View>
      <View style={{ color: "white", marginTop: "-4.7rem" }}>
        <Text
          nativeID="newmessage"
          style={{
            fontSize: "1.875rem",
            lineHeight: "2.25rem",
            paddingTop: "1.4rem",
            paddingBottom: "0.5rem",
            zIndex: "0",
            color: "white",
            textAlign: "center",
          }}
        >
          New Message
        </Text>
      </View>
      <KeyboardAvoidingView
        style={{ backgroundColor: "black", height: height }}
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
          <TextInput
            nativeID="textinput"
            autoFocus={true}
            onFocus={onFocus}
            onBlur={onBlur}
            value={recipient}
            onChange={handleTypingRecipient}
            placeholder="Recipient Address"
            style={{
              backgroundColor: "transparent",
              borderColor: "rgb(209 213 219)",
              borderRadius: "0px",
              marginLeft: "2%",
              marginRight: "2%",
              width: "96%",
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
        </View>
        <NativeComposeMessage
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
    </View>
  );
};

export default Compose2;
