import { KeyboardAvoidingView, View, TextInput, Text } from "react-native-web";
import Link from "next/link";
import { useEffect, useState } from "react";
import ComposeMessageField from "../components/UI/ComposeMessageField";
import AlertMessage from "../components/UI/AlertMessage";
import { Props } from "../components/types";
import CheckSendMessage from "../components/Logic/CheckSendMessage";
import { useRouter } from "next/router";

const Compose = (props: Props) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theAlertMessage, setTheAlertMessage] = useState({
    message: "",
    warning: true,
  });
  const [height, setHeight] = useState("45vh");

  async function handleSendMessage() {
    let result = await CheckSendMessage(message, recipient, props.keypair);
    if (!result[1]) {
      const router = useRouter();
      router.push("/conversation/[address]", `/conversation/${recipient}`);
    } else {
      sendAlert(result[0], result[1]);
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
      setHeight("85vh");
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
    <div
      className="bg-smoke mx-2 lg:w-3/4 lg:mx-auto"
      style={{ height: "90vh" }}
    >
      <div className="z-20">
        <Link href="/">
          <h5
            className="ml-auto w-fit z-20 text-white"
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
      <div style={{ color: "white", marginTop: "-4.7rem" }}>
        <h1
          className="text-white text-3xl text-white text-center z-0"
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
        style={{ backgroundColor: "#100c08", height: height }}
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
        <ComposeMessageField
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
