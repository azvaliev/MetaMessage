import { useContext, useEffect } from "react";
import Link from "next/link";
import { shortenPubkey } from "../lib/shorten";
import FloatOptionBar from "../components/option_bar/FloatOptionBar";
import handleRedirect from "../lib/account/handleRedirect";
import { useRouter } from "next/router";
import { UserContext } from "../lib/UserContext";

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
							{shortenPubkey(keypair.publicKey.toString(), true, mobile)}
						</Link>
					)}
				</h1>
			</div>

			{ conversations === null ? (
				<div className="w-full">
					<h3 className="pt-8 text-3xl text-center">Loading...</h3>
				</div>
			) : conversations !== null && Object.keys(conversations).length === 0 ? (
				<div className="w-full">
					<h3 className="pt-8 text-3xl text-center">No conversations yet</h3>
				</div>
			) : (
				<div className="w-full">
					{Object.keys(conversations).map((convID: string) => {
						const latest = conversations[convID].length - 1;
						if (keypair) {
							return (
								<Link
									href="/conversation/[address]"
									as={`/conversation/${convID.toString()}`}
									key={convID.toString()}
								>
									<div className="flex flex-col w-full px-2 pt-4 pb-2 border-b-2 border-gray-700">
										<div className="flex flex-row">
											<h3 className="ml-0 mr-auto text-2xl">
												{shortenPubkey(convID.toString(), false, mobile)}
											</h3>
										</div>
										<h4 className="pt-2 text-xl italic text-left text-gray-400 md:pt-4">
											{conversations[convID] &&
												conversations[convID][latest].sender !==
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

			{keypair !== null && <FloatOptionBar pubkey={keypair.publicKey} mobile={mobile}/>}
		</div>
	);
}
