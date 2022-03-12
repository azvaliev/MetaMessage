import * as web3 from "@solana/web3.js";

export default async function CheckMessages(wallet: web3.Keypair) {
  // Connect to Devnet Cluster
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );
  const pubkey = new web3.PublicKey(wallet.publicKey);

  let messages = [];

  // const accInfo = await connection.getAccountInfo(pubkey)
  // .catch(err => {
  //     console.error(err);
  // });

  const recents = await connection.getConfirmedSignaturesForAddress2(
    pubkey,
    {},
    "confirmed"
  );

  // Get messages and transaction signatures
  recents.forEach((transaction) => {
    if (transaction.memo != null) {
      let txDate: Date;
      try {
        txDate = new Date(
          transaction.memo.slice(transaction.memo.indexOf("||") + 2)
        );
      } catch {
        txDate = new Date();
      }

      messages.push({
        message: transaction.memo.slice(
          transaction.memo.indexOf("] ") + 2,
          transaction.memo.indexOf("||")
        ),
        date: txDate,
        signature: transaction.signature,
      });
    }
  });

  let cleanedMessages = [];

  // Figure out who sent the messages
  for (let i = 0; i < messages.length; i++) {
    let details = await connection.getParsedTransaction(messages[i].signature);
    let detailsList = details.transaction.message.accountKeys;
    let message_from: string;
    let message_to: string;

    detailsList.forEach((detail) => {
      if (detail.signer) {
        message_from = detail.pubkey.toString();
      } else if (detail.writable) {
        message_to = detail.pubkey.toString();
      }
    });
    cleanedMessages.push({
      ...messages[i],
      from: message_from,
      to: message_to,
    });
  }

  let parsedMessages = [];

  cleanedMessages.forEach((message) => {
    let pushed = false;
    parsedMessages.forEach((conversation) => {
      if (
        conversation[0].from == message.from ||
        conversation[0].to == message.to
      ) {
        conversation.push(message);
        pushed = true;
      }
    });
    if (pushed == false) {
      parsedMessages.push([message]);
    }
  });
  if (parsedMessages.length < 1) {
    parsedMessages = ["N/A"];
  }

  return parsedMessages;
}
