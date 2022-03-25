import Image from "next/image";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface Props {
  onFocus(): void;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  message: string;
  handleTypingMessage: ChangeEventHandler<HTMLTextAreaElement>;
  handleSendMessage(): void;
  mobile: boolean;
}

export default function NativeComposeMessage(props: Props) {
	const scrollUp = () => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 40);
		props.onFocus();
	};
	const calculateResizePoint = () => {
		if (props.mobile) {
			return props.message.length < 36 ? 2 : 3;
		} else {
			return props.message.length < 72 ? 2 : 3;
		}
	};

	return (
		<div className="flex flex-row bg-black mt-auto mb-0 border-[1px] border-gray-300 rounded-3xl text-white">
			<textarea
				className="bg-transparent focus:outline-none resize-none border-gray-300 ml-[2%] mr-[2%] w-[84%] md:w-[90%] text-3xl my-[1vh]"
				value={props.message}
				onChange={props.handleTypingMessage}
				placeholder="Message"
				onFocus={scrollUp}
				onBlur={props.onBlur}
				rows={calculateResizePoint()}
			/>
			<div className="m-auto mt-0 bg-gradient-to-r from-blue-600 to-purple-600 py-2 px-1 rounded-3xl mr-0">
				<div
					className="relative w-[18vw] md:w-[8vw] lg:w-[6.5vw] h-[18vw] md:h-[8vw] lg:h-[6.5vw] mr-2"
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
