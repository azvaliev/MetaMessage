import * as web3 from "@solana/web3.js";

export interface Props {
  onGenerateKeypair: Function;
  keypair: web3.Keypair;
  pubkey: web3.PublicKey;
  conversations: any;
  mobile: boolean;
  activeConversation: Object;
  onUpdateNeeded: Function;
  showAppGuide: boolean;
  onShowAppGuide: Function;
}
