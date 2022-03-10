import * as web3 from "@solana/web3.js";
import { MouseEventHandler } from "react";

export interface Props {
  onGenerateKeypair: MouseEventHandler;
  keypair: web3.Keypair;
  pubkey: web3.PublicKey;
  conversations: any;
  mobile: boolean;
  activeConversation: Object;
  onUpdateNeeded: Function;
  showAppGuide: boolean;
  onShowAppGuide: Function;
  currentRecipient: string;
  setCurrentRecipient: Function;
}

export interface MessageObj {
  from: string;
  message: string;
  date: Date;
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
