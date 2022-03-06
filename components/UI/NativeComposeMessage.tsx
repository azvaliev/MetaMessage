import { View, TextInput } from "react-native-web";
import Image from "next/image";

interface Props {
  onFocus: Function;
  onBlur: Function;
  message: string;
  handleTypingMessage: Function;
  handleSendMessage: any;
}

export default function NativeComposeMessage(props: Props) {
  const scrollUp = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 40);
    props.onFocus();
  };

  return (
    <View
      style={{
        borderWidth: "1px",
        borderColor: "grey",
        borderRadius: "25px",
        minHeight: "10vh",
        color: "white",
        marginTop: "auto",
        marginBottom: "0",
        marginLeft: "2%",
        marginRight: "2%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TextInput
        value={props.message}
        onChange={props.handleTypingMessage}
        placeholder="Message"
        nativeID="textinput"
        multiline={true}
        onFocus={scrollUp}
        onBlur={props.onBlur}
        numberOfLines={props.message.length < 36 ? 2 : 3}
        style={{
          backgroundColor: "transparent",
          borderColor: "rgb(209 213 219)",
          borderRadius: "0px",
          marginLeft: "2%",
          marginRight: "2%",
          width: "84%",
          fontSize: "1.875rem",
          lineHeight: "2.25rem",
          marginTop: "1vh",
          marginBottom: "1vh",
        }}
      />
      <div className="m-auto mt-0 bg-gradient-to-r from-blue-600 to-purple-600 py-2 px-1 rounded-3xl mr-0">
        <div
          className="relative w--10 h-10vw mr-2"
          onClick={props.handleSendMessage}
        >
          <Image
            src="/img/compose.png"
            alt="Compose"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </View>
  );
}
