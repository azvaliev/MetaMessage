import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

export default async function CheckMessages(wallet: web3.Keypair) {
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

	let messages = []

	
	// Get message ID's, sender information 
	recents.forEach(async (transaction) => {
		const parsedTransaction = await connection.getParsedTransaction(transaction.signature)
		const details = parsedTransaction.transaction.message.instructions[0].parsed.info;
		// console.log(parsedTransaction.meta.innerInstructions);
		const innerInstructions = parsedTransaction.meta.innerInstructions[0].instructions[0].parsed.info;
		const sender = new web3.PublicKey(details.source);
		const reciever = new web3.PublicKey(details.wallet);
		const mint = new web3.PublicKey(details.mint);
		const tokenAccount = new web3.PublicKey(innerInstructions.destination);
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

		if (sender != wallet.publicKey) {
			// Messages sent from user will be encrypted in localstorage until
			// read signal is recieved
			const accDetail = await splToken.getAccount(connection, tokenAccount);
			const balance = Number(accDetail.amount );
			if (balance > 0) {
				messages.push({
					'sender': sender,
					'reciever': reciever,
					'tokenAccount': tokenAccount,
					'senderTokenAccount': senderTokenAccount,
					'messageID': mint
				})
			}
		}

	});

	return messages;
}
