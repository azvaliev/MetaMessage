import {Keypair, PublicKey} from "@solana/web3.js";
import {MouseEventHandler} from "react";

export interface Props {
	keypair: Keypair;
	pubkey: PublicKey;
	conversations: any;
	mobile: boolean;
	activeConversation: Object;
	onUpdateNeeded: Function;
	showAppGuide: boolean;
	onShowAppGuide: Function;
	currentRecipient: string;
	setCurrentRecipient: Function;
	onSetPassword: Function;
	onSignIn: Function;
	onLogout: MouseEventHandler;
	onDeleteAccount: MouseEventHandler;
	onSendToLoginSignup: Function;
}

export interface MessageObj {
	sender: PublicKey,
	reciever: PublicKey,
	tokenAccount: PublicKey,
	senderTokenAccount: PublicKey,
	messageID: PublicKey
}

export interface PasswordStrengthObj {
	min_length: boolean;
	contain_num: boolean;
	contain_special: boolean;
	not_generic: boolean;
	contains_capital: boolean;
	good_mix?: boolean;
	optimal_length?: boolean;
}
