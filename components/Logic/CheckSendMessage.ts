import { Keypair } from "@solana/web3.js";
import SendMsg from "./SendMsg";

export default async function CheckSendMessage(
  message: string,
  recipient: string,
  keypair: Keypair
) {
  if (message.length < 1) {
    return ["Message too short", true];
  } else {
    if (recipient.length < 32) {
      return ["Please enter valid address", true];
    } else {
      if (message.length > 300) {
        return ["Please shorten your message", true];
      } else {
        let result = await SendMsg(message, recipient, keypair);
        if (result == "badkey") {
          return ["Recipient address is invalid: Please Verify", true];
        } else if (result == "success") {
          return ["Message Delivered", false];
        }
      }
    }
  }
}
