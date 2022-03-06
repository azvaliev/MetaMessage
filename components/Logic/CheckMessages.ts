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
    [],
    "confirmed"
  );

  // Get messages and transaction signatures
  recents.forEach((transaction) => {
    if (transaction.memo != null) {
      messages.push({
        message: transaction.memo.slice(4, transaction.memo.length - 39),
        date: new Date(transaction.memo.slice(transaction.memo.length - 40)),
        signature: transaction.signature,
      });
    }
  });

  let cleanedMessages = [];

  // Figure out who sent the messages
  for (let i = 0; i < messages.length; i++) {
    let details = await connection.getParsedTransaction(messages[i].signature);
    let detailsList = details.transaction.message.accountKeys;

    detailsList.forEach((detail) => {
      if (detail.signer) {
        if (detail.pubkey.toString() == pubkey.toString()) {
          // do nothing
        } else {
          cleanedMessages.push({
            ...messages[i],
            from: detail.pubkey.toString(),
          });
        }
      }
    });
  }

  let parsedMessages = [];

  cleanedMessages.forEach((message) => {
    let pushed = false;
    parsedMessages.forEach((conversation) => {
      if (conversation[0].from == message.from) {
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
