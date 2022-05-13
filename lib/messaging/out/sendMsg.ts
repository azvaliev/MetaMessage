import postMessage from "./postMessage";

import * as splToken from "@solana/spl-token";
import * as web3 from "@solana/web3.js";

export default async function SendMsg(
	message: string,
	recipient: string,
	wallet: web3.Keypair
) {
	// Connect to Devnet Cluster
	const connection = new web3.Connection(
		web3.clusterApiUrl("devnet"),
		"confirmed"
	);
	console.log("CONNECTED");

	const recipPubkey = new web3.PublicKey(recipient);

	// Airdrop SOL for fees
	const balance = await connection.getBalance(wallet.publicKey);
	if (balance < web3.LAMPORTS_PER_SOL) {
		const airdropSignature = await connection.requestAirdrop(
			wallet.publicKey,
			web3.LAMPORTS_PER_SOL
		);

		await connection.confirmTransaction(airdropSignature);
	}

	try {
		console.error("about to mint");
		// Initialize a mint with unique token
		const mint = <web3.PublicKey> await splToken
			.createMint(connection, wallet, wallet.publicKey, wallet.publicKey, 0)
			.catch(err => 
				console.error(err, mint)
			);

		// Create a new account to hold token
		// Mint directly to recipient account
		const associatedTokenAccount =
			await splToken.getOrCreateAssociatedTokenAccount(
				connection,
				wallet,
				mint,
				recipPubkey
			);

		// Mint one token to account
		await splToken.mintTo(
			connection,
			wallet,
			mint,
			associatedTokenAccount.address,
			wallet,
			1
		);

		// // Create a token account for recipient
		// const toTokenAccount = 
		// 	await splToken.getOrCreateAssociatedTokenAccount(
		// 	connection,
		// 	wallet,
		// 	mint,
		// 	recipPubkey
		// );

		// // Transfer newly minted token to recipient
		// const signature = await splToken.transfer(
		// 	connection,
		// 	wallet,
		// 	associatedTokenAccount.address,
		// 	toTokenAccount.address,
		// 	wallet.publicKey,
		// 	1
		// );

		const mintInfo = await splToken.getMint(connection, mint);
		// Mint creators i.e. sender address
		console.error(mintInfo.mintAuthority.toString());
		// Mint address for use in DB
		console.error(mintInfo.address.toString());
		const mintID = mintInfo.address.toString();
		const res = await postMessage(mintID, message);
		return res.ok ? "success" : "badkey";
	} catch (err) {
		console.error(err);
		return "badkey";
	}
}
