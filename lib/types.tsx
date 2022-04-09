import {Keypair, PublicKey} from "@solana/web3.js";
import {MouseEventHandler} from "react";

export interface userInfo {
	keypair: Keypair;
	conversations: ConversationDict;
	mobile: boolean;
}
export interface pageProps {
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

export interface PasswordStrengthObj {
	min_length: boolean;
	contain_num: boolean;
	contain_special: boolean;
	not_generic: boolean;
	contains_capital: boolean;
	good_mix?: boolean;
	optimal_length?: boolean;
}
