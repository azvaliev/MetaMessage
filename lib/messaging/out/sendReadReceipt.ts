import  * as spl from "@solana/spl-token";
import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import { MessageObj } from "../../types";

const sendReadReceipt = async (wallet: Keypair, messageDetails: MessageObj) => {
	const connection = new Connection(
		clusterApiUrl("devnet"),
		"confirmed"
	);
	console.log(await spl.getAccount(connection, messageDetails.tokenAccount));
	await spl.transfer(connection, wallet, messageDetails.tokenAccount, messageDetails.senderTokenAccount, wallet, 1);
	return spl.closeAccount(connection, wallet, messageDetails.tokenAccount, null, wallet);
};

export default sendReadReceipt;