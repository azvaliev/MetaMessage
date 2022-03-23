import checkMessages from "./checkMessages";
import {Keypair} from "@solana/web3.js";

async function getConversations(wallet: Keypair) {
	let incoming = await checkMessages(wallet);
	if (incoming.length === 0) {
		incoming.push("N/A");
	}
	return incoming;
}

export default getConversations;
