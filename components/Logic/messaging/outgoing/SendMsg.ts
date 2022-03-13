import { CreateDate } from "../../CreateFormatDate";

// import * as splToken from '@solana/spl-token'

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
    // Sending SOL - may be unneccesary
    const transferTransaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipPubkey,
        lamports: web3.LAMPORTS_PER_SOL * 0.00001,
      })
    );
    const timeFormat = CreateDate();
    let msgFormat = message + "||" + timeFormat.toString();

    // Sending message using Solana Memo Program
    transferTransaction.add(
      new web3.TransactionInstruction({
        keys: [{ pubkey: wallet.publicKey, isSigner: true, isWritable: true }],
        data: Buffer.from(msgFormat, "utf-8"),
        programId: new web3.PublicKey(
          "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
        ),
      })
    );

    await web3.sendAndConfirmTransaction(connection, transferTransaction, [
      wallet,
    ]);

    // const mint = await splToken.createMint(
    //     connection,
    //     wallet,
    //     wallet.publicKey,
    //     wallet.publicKey,
    //     0
    // ).catch(err => {
    //     console.error(err, mint)
    // })

    // console.error('minted!')

    // const associatedTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
    //     connection,
    //     wallet,
    //     mint,
    //     wallet.publicKey
    // );

    // console.error('Finding/creating mint account');

    // await splToken.mintTo(
    //     connection,
    //     wallet,
    //     mint,
    //     associatedTokenAccount.address,
    //     wallet,
    //     1
    // );

    // console.error('minted!')

    // const toTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(connection, wallet, mint, new web3.PublicKey(recipient))

    // const signature = await splToken.transfer(
    //     connection,
    //     wallet,
    //     associatedTokenAccount.address,
    //     toTokenAccount.address,
    //     wallet.publicKey,
    //     1
    // )

    // const accountInfo = await splToken.getAccount(connection, associatedTokenAccount.address);
    // const mintInfo = await splToken.getMint(
    //     connection,
    //     mint
    // );
    // console.error(signature);

    let conversations = JSON.parse(
      localStorage.getItem(recipPubkey.toString())
    );
    try {
      conversations.push({
        message: message,
        date: timeFormat,
      });
    } catch (err) {
      conversations = [
        {
          message: message,
          date: timeFormat,
        },
      ];
    }
    localStorage.setItem(recipPubkey.toString(), JSON.stringify(conversations));

    return "success";
  } catch (err) {
    console.error(err);
    return "badkey";
  }
}
