import { useContext, useEffect } from "react";
import Link from "next/link";
import { ShortenPubkey } from "../components/UI/Shorten";
import { MessageObj } from "../components/types";
import FloatOptionBar from "../components/UI/option_bar/FloatOptionBar";
import handleRedirect from "../components/Logic/account/handleRedirect";
import { useRouter } from "next/router";
import { UserContext } from "../components/UserContext";

export default function Home() {

	const { keypair, mobile, conversations } = useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		if (keypair === null) {
			router.push(handleRedirect());
		}
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="w-full flex flex-col max-h-screen bg-smoke text-white lg:w-[65%] mx-auto">
			<div className="flex flex-row px-2 py-4 border-b-2 border-gray-300 h-fit">
				<h1 className="mx-auto my-auto text-3xl lg:text-35xl" id="home">
					{keypair !== null && (
						<Link
							href="/profile/[address]"
							as={`/profile/${keypair.publicKey.toString()}`}
						>
							{ShortenPubkey(keypair.publicKey.toString(), true, mobile)}
						</Link>
					)}
				</h1>
			</div>

			{keypair !== null && conversations.length === 0 ? (
				<div className="w-full">
					<h3 className="pt-8 text-3xl text-center">Loading...</h3>
				</div>
			) : conversations === null ? (
				<div className="w-full">
					<h3 className="pt-8 text-3xl text-center">No conversations yet</h3>
				</div>
			) : (
				<div className="w-full">
					{conversations.map((conversation: Array<MessageObj>) => {
						let recipient = null;
						conversation.forEach((message) => {
							if (
								message.sender !== keypair.publicKey &&
								message.sender !== undefined
							) {
								recipient = message.sender;
							}
						});
						if (recipient == null) {
							recipient = conversation[0].reciever;
						}
						if (recipient !== null) {
							return (
								<Link
									href="/conversation/[address]"
									as={`/conversation/${recipient.toString()}`}
									key={recipient.toString()}
								>
									<div className="flex flex-col w-full px-2 pt-4 pb-2 border-b-2 border-gray-700">
										<div className="flex flex-row">
											<h3 className="ml-0 mr-auto text-2xl">
												{ShortenPubkey(recipient.toString(), false, mobile)}
											</h3>
										</div>
										<h4 className="pt-2 text-xl italic text-left text-gray-400 md:pt-4">
											{conversation[conversation.length - 1].sender !==
												keypair.publicKey
												? "New Message"
												: "Delivered"}
										</h4>
									</div>
								</Link>
							);
						}
					})}
				</div>
			)}

			{keypair !== null && <FloatOptionBar pubkey={keypair.publicKey} />}
		</div>
	);
}
