import "../styles/globals.css";
import { useState, useEffect } from "react";
import getConversations from "../components/logic/messaging/in/getConversations";
import { useRouter } from "next/router";
import isMobile from "../components/logic/isMobile";
import type { AppProps } from "next/app";
import encryptStorePassword from "../components/logic/encryption_local/encryptStorePassword";
import deleteAccount from "../components/logic/account/deleteAccount";
import { Keypair } from "@solana/web3.js";
import { UserContext } from "../components/UserContext";
import { MessageObj } from "../components/types";

function MyApp({ Component, pageProps }: AppProps) {
	const [keypair, setKeypair] = useState<Keypair>(null);
	const [conversations, setConversations] = useState<Array<Array<MessageObj>>>([]);
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
				}, 5000);

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
