import "../styles/globals.css";
import { useState, useEffect } from "react";
import getConversations from "../components/Logic/messaging/incoming/getConversations";
import { useRouter } from "next/router";
import IsMobile from "../components/Logic/IsMobile";
import type { AppProps } from "next/app";
import encryptStorePassword from "../components/Logic/local_encryption/encryptStorePassword";
import deleteAccount from "../components/Logic/account/deleteAccount";
import { Keypair } from "@solana/web3.js";

function MyApp({ Component, pageProps }: AppProps) {
	const [keypair, setKeypair] = useState(null);
	const [conversations, setConversations] = useState([]);
	const [mobile, setMobile] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Check if keypair has been retrieved succesfully before
		// atttempting to get messages
		if (keypair !== null) {
			if (keypair.length < 1) {
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
		setKeypair("");
	};

	useEffect(() => {
		// For testing purposes
		// storedData.removeItem("keypair");
		setMobile(IsMobile());
	}, []);


	const handleSetPassword = async (password: string) => {
		const [tempKey] = await encryptStorePassword(password);
		setKeypair(tempKey);
		router.push("/");
	};

	return (
		<Component
			{...pageProps}
			keypair={keypair}
			conversations={conversations}
			mobile={mobile}
			onSetPassword={handleSetPassword}
			onSignIn={handleSignIn}
			onLogout={handleLogout}
			onDeleteAccount={handleDeleteAccount}
		/>
	);
}

export default MyApp;
