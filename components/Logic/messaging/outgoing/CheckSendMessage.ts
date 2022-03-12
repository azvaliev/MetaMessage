import { Keypair } from "@solana/web3.js";
import SendMsg from "./SendMsg";

export default async function CheckSendMessage(
  message: string,
  recipient: string,
  keypair: Keypair
) {
  if (message.length < 1) {
    return {alertMsg: "Message too short",warning: true};
  } else {
    if (recipient.length < 32) {
      return {alertMsg: "Please enter valid address", warning: true};
    } else {
      if (message.length > 300) {
        return {alertMsg: "Please shorten your message", warning: true};
      } else {
        let result = await SendMsg(message, recipient, keypair);
        if (result == "badkey") {
          return {alertMsg: "Recipient address is invalid: Please Verify", warning: true};
        } else if (result == "success") {
          return {alertMsg: "Message Delivered", warning: false};
        }
      }
    }
  }
}
