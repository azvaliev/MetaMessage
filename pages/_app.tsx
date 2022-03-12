import "../styles/globals.css";
import Head from "next/head";
import { useState, useEffect } from "react";
import GetConversations from "../components/Logic/GetConversations";
import { useRouter } from "next/router";
import IsMobile from "../components/Logic/IsMobile";
import type { AppProps } from "next/app";
import encryptStorePassword from "../components/Logic/local_encryption/encryptStorePassword";
import DeleteAccount from "../components/Logic/account/DeleteAccount";
import { Keypair, PublicKey } from "@solana/web3.js";

function MyApp({ Component, pageProps }: AppProps) {
  const [keypair, setKeypair] = useState(null);
  const [pubkey, setPubkey] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [mobile, setMobile] = useState(false);
  const [showAppGuide, setShowAppGuide] = useState(false);
  const [currentRecipient, setCurrentRecipient] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if keypair has been retrieved succesfully before
    // atttempting to get messages
    if (keypair !== null) {
      if (keypair.length < 1) {
        router.push("/welcome");
      } else {
        setTimeout(async () => {
          setConversations(await GetConversations(keypair));
        }, 5);
        // TODO move this with the above
        let check = setInterval(async () => {
          try {
            setConversations(await GetConversations(keypair));
          } catch (err) {
            console.error(err);
          }
        }, 6000);

        () => {
          clearInterval(check);
        };
      }
    }
  }, [keypair]);

  const handleSignIn = (kp: Keypair, pk: PublicKey) => {
    setKeypair(kp);
    setPubkey(pk);
    router.push("/");
  };

  const handleLogout = () => {
    setKeypair(null);
    setPubkey(null);
    router.push("/login");
  };
  const handleDeleteAccount = async () => {
    // Send user back to homepage while deleting all data
    await DeleteAccount();
    router.push("/welcome");

    setKeypair("");
    setPubkey("");
  };

  useEffect(() => {
    // storedData.removeItem("keypair");
    // For testing purposes
    setMobile(IsMobile());

    const keypairCheck = localStorage.getItem("keypair");
    if (keypairCheck) {
      router.push("/login");
    } else {
      router.push("/welcome");
    }
  }, []);

  const handleRefreshConversation = async () => {
    setConversations(await GetConversations(keypair));
  };

  const handleShowAddAppGuide = () => {
    setShowAppGuide(!showAppGuide);
  };

  const handleSetRecipient = (recipient: string) => {
    setCurrentRecipient(recipient);
  };

  const handleSetPassword = async (password: string) => {
    const [tempKey, tempPubkey] = await encryptStorePassword(password);
    setKeypair(tempKey);
    setPubkey(tempPubkey);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Meta Message</title>
        <meta
          name="description"
          content="Privacy focused, secure, and encrypted messaging."
        />
        <link rel="icon" href="/icon/favicon.ico" />
        <link rel="icon" href="/icon/logo32.png" sizes="32x32" />
        <link rel="icon" href="/icon/logo57.png" sizes="57x57" />
        <link rel="icon" href="/icon/logo76.png" sizes="76x76" />
        <link rel="icon" href="/icon/logo96.png" sizes="96x96" />
        <link rel="icon" href="/icon/logo128.png" sizes="128x128" />
        <link rel="icon" href="/icon/logo192.png" sizes="192x192" />
        <link rel="icon" href="/icon/logo228.png" sizes="228x228" />

        {/* <!-- Android --> */}
        <link rel="shortcut icon" sizes="196x196" href="/icon/logo196.png" />

        {/* <!-- iOS -->*/}
        <link rel="apple-touch-icon" href="/icon/logo120.png" sizes="120x120" />
        <link rel="apple-touch-icon" href="/icon/logo152.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/icon/logo180.png" sizes="180x180" />

        {/* <!-- Windows 8 IE 10--> */}
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/icon/logo144.png" />

        {/* <!-- Windows 8.1 + IE11 and above --> */}
        <meta name="msapplication-config" content="/icon/browserconfig.xml" />

        {/* <!-- Apple Web App Capable --> */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Component
        {...pageProps}
        keypair={keypair}
        pubkey={pubkey}
        conversations={conversations}
        mobile={mobile}
        onUpdateNeeded={handleRefreshConversation}
        showAppGuide={showAppGuide}
        onShowAppGuide={handleShowAddAppGuide}
        currentRecipient={currentRecipient}
        setCurrentRecipient={handleSetRecipient}
        onSetPassword={handleSetPassword}
        onSignIn={handleSignIn}
        onLogout={handleLogout}
        onDeleteAccount={handleDeleteAccount}
      />
    </>
  );
}

export default MyApp;
