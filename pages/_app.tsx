import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import type { Keypair } from "@solana/web3.js";
import _ from "lodash";

import { UserContext } from "../lib/UserContext";
import encryptStorePassword from "../lib/encryption/encryptStorePassword";
import deleteAccount from "../lib/account/deleteAccount";
import checkMessages from "../lib/messaging/in/checkMessages";
import isMobile from "../lib/isMobile";
import type { ConversationDict } from "../lib/types";
import useInterval from "../lib/hooks/useInterval";


async function getConversations(wallet: Keypair) {
	const incoming = await checkMessages(wallet);
	return incoming;
}

function MyApp({ Component, pageProps }: AppProps) {
	const [keypair, setKeypair] = useState<Keypair>(null);
	const [conversations, setConversations] = useState<ConversationDict>(null);
	const [mobile, setMobile] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		// Check if keypair has been retrieved succesfully before
		// atttempting to get messages
		if (keypair) {
			setTimeout(async () => {
				setConversations(await getConversations(keypair));
			}, 5);
		}
	}, []);

	useInterval(async () => {
		if (keypair) {
			try {
				const newConversations = await getConversations(keypair);
				if (!_.isEqual(newConversations, conversations)) {
					setConversations(newConversations);
				}
			} catch (err) {
				console.error(err);
			}
		}
	}, 3000);

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

		setConversations({});
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
			keypair,
			conversations,
			mobile
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
