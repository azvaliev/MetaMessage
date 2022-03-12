import { KeyboardAvoidingView, View} from "react-native-web";
import Link from "next/link";
import { useEffect, useState } from "react";
import ComposeMessageField from "../components/UI/conversation/ComposeMessageField";
import AlertMessage from "../components/UI/AlertMessage";
import { Props } from "../components/types";
import CheckSendMessage from "../components/logic/messaging/outgoing/CheckSendMessage";
import { useRouter } from "next/router";

const Compose = (props: Props) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theAlertMessage, setTheAlertMessage] = useState({
    message: "",
    warning: true,
  });
  const [height, setHeight] = useState("45vh");
  const router = useRouter();

  async function handleSendMessage() {
    sendAlert("Sending...", false);
    let result = await CheckSendMessage(message, recipient, props.keypair);
    await props.onUpdateNeeded();
    if (!result.warning) {
      router.push("/conversation/[address]", `/conversation/${recipient}`);
    } else {
      sendAlert(result.alertMsg, result.warning);
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
          className="text-3xl text-white text-center z-0"
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
          mobile={props.mobile}
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
