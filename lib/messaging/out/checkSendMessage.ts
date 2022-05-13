import { Keypair } from "@solana/web3.js";
import sendMsg from "./sendMsg";

export default async function checkSendMessage(
	message: string,
	recipient: string,
	keypair: Keypair
) {
	if (message.length < 1) {
		return { alertMsg: "Message too short", warning: true };
	}
	if (recipient.length < 32) {
		return { alertMsg: "Please enter valid address", warning: true };
	}
	if (message.length > 300) {
		return { alertMsg: "Please shorten your message", warning: true };
	}
	const result = await sendMsg(message, recipient, keypair);
	if (result == "badkey") {
		return {
			alertMsg: "Recipient address is invalid: Please Verify",
			warning: true
		};
	}

	return { alertMsg: "Message Delivered", warning: false };
	
}
