/* eslint-disable react/jsx-max-props-per-line */
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OptionHolder, OptionInnerHolder, Bar } from "./StyledOptionBar";
import QRCode from "react-qr-code";
import { PublicKey } from "@solana/web3.js";

export default function FloatOptionBar(props: { pubkey: PublicKey, mobile: boolean }) {
	const [showOptions, setShowOptions] = useState(false);

	const handleToggleOptions = () => {
		setShowOptions(!showOptions);
	};

	return (
		<Bar className="h-full left-auto z-20 absolute flex flex-col-reverse">
			<Link href="/compose">
				<OptionHolder className="relative invert top-auto right-1 left-auto bg-yellow-600 rounded-2xl md:rounded-xl">
					<OptionInnerHolder className="relative invert">
						<Image
							src="/img/compose.png"
							alt="Compose"
							layout="fill"
							objectFit="contain"
							className="my-auto"
						/>
					</OptionInnerHolder>
				</OptionHolder>
			</Link>
			{!showOptions ? (
				<OptionHolder
					className="relative top-auto right-1 left-auto invert  bg-gray-300 rounded-2xl md:rounded-xl"
					onClick={handleToggleOptions}
				>
					<OptionInnerHolder className="relative invert top-auto flex my-auto">
						<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="#fff" className="h-full w-full">
							<path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
						</svg>
					</OptionInnerHolder>
				</OptionHolder>
			) : (
				<>
					<OptionHolder
						className="relative top-auto right-1 left-auto invert  bg-gray-300 rounded-2xl md:rounded-xl"
						onClick={handleToggleOptions}
					>
						<OptionInnerHolder className="relative invert top-auto flex my-auto">
							<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="#fff" className="h-full w-full">
								<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
							</svg>
						</OptionInnerHolder>
					</OptionHolder>
					<OptionHolder className="z-10 relative top-auto right-1 left-auto bg-black rounded-2xl md:rounded-xl">
						<Link
							href="/profile/[address]"
							as={`/profile/${props.pubkey.toString()}`}
						>
							<Image
								src="/img/logoblue.webp"
								alt="Profile"
								layout="fill"
								objectFit="contain"
								className="z-50 rounded-b-2xl md:rounded-b-xl "
							/>
						</Link>
					</OptionHolder>
					{props.mobile && (
						<Link href="/scan">
							<OptionHolder className="z-10 relative top-auto right-1 left-auto bg-p-blue rounded-2xl md:rounded-xl">
								<OptionInnerHolder className="relative top-2 md:top-1 m-auto w-fit h-fit flex">
									<QRCode
										value=""
										size={props.mobile ? 55 : 55}
										className="m-auto"
										bgColor="#000"
										fgColor="#3472f5"
									/>
								</OptionInnerHolder>
							</OptionHolder>
						</Link>
					)}
				</>
			)}
		</Bar>
	);
}
