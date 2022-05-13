/* eslint-disable no-prototype-builtins */
import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import checkForReadReceipt from "./checkForReadReceipt";

export default async function checkMessages(wallet: web3.Keypair) {
	// Connect to Devnet Cluster
	const connection = new web3.Connection(
		web3.clusterApiUrl("devnet"),
		"confirmed"
	);
	const pubkey = new web3.PublicKey(wallet.publicKey);

	// get recent transactions
	const recents = await connection.getConfirmedSignaturesForAddress2(
		pubkey,
		{},
		"confirmed"
	);

	const conversations = {};

	// Get message ID's, sender information 
	for (let i = 0; i < recents.length; i++) {
		const transaction = recents[i];
		try {
			const parsedTransaction: any = await connection.getParsedTransaction(transaction.signature);
			const details = parsedTransaction.transaction.message.instructions[0].parsed.info;
			// console.log(parsedTransaction.meta.innerInstructions);
			const innerInstructions = parsedTransaction.meta.innerInstructions[0].instructions[0].parsed.info;
			const sender = new web3.PublicKey(details.source);
			const reciever = new web3.PublicKey(details.wallet);
			const mint = new web3.PublicKey(details.mint);
			let tokenAccount;
			try {
				tokenAccount = new web3.PublicKey(innerInstructions.destination);
			} catch {
				tokenAccount = new web3.PublicKey(innerInstructions.newAccount);
			}
			const senderTokenAccount = new web3.PublicKey(innerInstructions.source);

			// an alternate way of getting some of this information
			// const tokenAccount = details.account;
			// let senderTokenAccount: web3.PublicKey;
			// console.log(parsedTransaction)
			// parsedTransaction.transaction.message.accountKeys.forEach((account) => {
			// 	if (account.signer && account.writable) {
			// 		senderTokenAccount = account.pubkey;
			// 	}
			// })

			if (sender.toString() != wallet.publicKey.toString()) {
				// Messages sent from user will be encrypted in localstorage until
				// read signal is recieved
				const mintAuthority = (await splToken.getMint(connection, mint)).mintAuthority;
				const splAccDetail = await splToken.getAccount(connection, tokenAccount);
				const balance = Number(splAccDetail.amount);
				if (balance > 0) {
					const isReadReceipt = await checkForReadReceipt(connection, splAccDetail, mint, mintAuthority, wallet, sender);
					// Check if the token is a read receipt or new message
					// Handle read receipt in checkForReadReceipt()
					if (!isReadReceipt) {
						const newMessage = {
							"sender": sender,
							"reciever": reciever,
							"tokenAccount": tokenAccount,
							"senderTokenAccount": senderTokenAccount,
							"messageID": mint
						};
						if (conversations.hasOwnProperty(sender.toString())) {
							conversations[sender.toString()].push(newMessage);
						} else {
							conversations[sender.toString()] = [newMessage];
						}
					}
				}
			}
		} catch (err) {
			continue;
		}
	}

	return conversations;
}