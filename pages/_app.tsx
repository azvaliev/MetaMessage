import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import type { Keypair } from "@solana/web3.js";
import type { MessageObj } from "../lib/types";

import { UserContext } from "../lib/UserContext";
import encryptStorePassword from "../lib/encryption/encryptStorePassword";
import deleteAccount from "../lib/account/deleteAccount";
import checkMessages from "../lib/messaging/in/checkMessages";
import isMobile from "../lib/isMobile";


async function getConversations(wallet: Keypair) {
	let incoming = await checkMessages(wallet);
	if (incoming.length === 0) {
		incoming = [];
	}
	return incoming;
}

function MyApp({ Component, pageProps }: AppProps) {
	const [keypair, setKeypair] = useState<Keypair>(null);
	const [conversations, setConversations] = useState<Array<Array<MessageObj>>>(null);
	const [mobile, setMobile] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		// Check if keypair has been retrieved succesfully before
		// atttempting to get messages
		if (keypair !== null) {
			if (keypair.toString().length < 1) {
				router.push("/welcome");
			} else {
				setTimeout(async () => {
					setConversations(await getConversations(keypair));
				}, 5);
				// TODO move this with the above
				const check = setInterval(async () => {
					try {
						const newConversations = await getConversations(keypair);
						if (newConversations !== conversations) {
							setConversations(newConversations);
						}
					} catch (err) {
						console.error(err);
					}
				}, 3000);

				() => {
					clearInterval(check);
				};
			}
		}
	}, [keypair]);

	const handleSignIn = (kp: Keypair) => {
		setKeypair(kp);
		router.push("/");
	};

	const handleLogout = () => {
		setKeypair(null);
		setTimeout(() => {
			router.push("/login");
		}, 50);
	};
	const handleDeleteAccount = async () => {
		// Send user back to homepage while deleting all data
		router.push("/welcome");
		await deleteAccount();

		setConversations([]);
		setKeypair(null);
	};

	useEffect(() => {
		// For testing purposes
		// storedData.removeItem("keypair");
		setMobile(isMobile());
	}, []);


	const handleSetPassword = async (password: string) => {
		const tempKey = await encryptStorePassword(password);
		setKeypair(tempKey);
		router.push("/");
	};

	return (
		<UserContext.Provider value={{
			keypair: keypair,
			conversations: conversations,
			mobile: mobile,
		}}>
			<Component
				{...pageProps}
				onSetPassword={handleSetPassword}
				onSignIn={handleSignIn}
				onLogout={handleLogout}
				onDeleteAccount={handleDeleteAccount}
			/>
		</UserContext.Provider>
	);
}

export default MyApp;
