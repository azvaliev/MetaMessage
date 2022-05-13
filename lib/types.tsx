import { Keypair, PublicKey } from "@solana/web3.js";
import { MouseEventHandler } from "react";

export interface UserInfo {
	keypair: Keypair;
	conversations: ConversationDict;
	mobile: boolean;
}
export interface PageProps {
	onSetPassword(password: string): void;
	onSignIn(kp: Keypair): void;
	onLogout: MouseEventHandler;
	onDeleteAccount: MouseEventHandler;
}

export interface MessageObj {
	sender: PublicKey,
	reciever: PublicKey,
	tokenAccount: PublicKey,
	senderTokenAccount: PublicKey,
	messageID: PublicKey,
	messageContents?: string,
}

export type ConversationDict = Record<string, MessageObj[]>;
