import ComposeField from "./ComposeField";
import Image from "next/image";

interface Props {
  bottom: string;
  extramargin: boolean;
  message: string;
  handleSendMessage: any;
  handleTypingMessage: Function;
}

export default function DesktopCompose(props: Props) {
  return (
    <div
      className={`absolute ${
        props.bottom
      } top-auto enter flex flex-row text-3xl border-1 border-gray-300 rounded-3xl w-full lg:static lg:mt-auto lg:mb-12 lg:w-auto ${
        props.extramargin ? "lg:mx-12" : "lg:mx-02"
      } lg:border-2`}
    >
      <ComposeField
        textarea={true}
        value={props.message}
        onInputChange={props.handleTypingMessage}
        placeholder="Message"
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
    </div>
  );
}

