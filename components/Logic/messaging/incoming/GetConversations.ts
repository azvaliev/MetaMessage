import CheckMessages from "./CheckMessages";
import {Keypair} from "@solana/web3.js";

async function GetConversations(wallet: Keypair) {
	let incoming = await CheckMessages(wallet);
	if (incoming.length === 0) {
		incoming.push("N/A")
	}
	return incoming;
}

export default GetConversations;
