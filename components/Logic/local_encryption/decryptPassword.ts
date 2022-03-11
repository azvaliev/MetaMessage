const { randomBytes, createDecipheriv } = require("crypto");
import { Keypair } from "@solana/web3.js";

const decryptPassword = (password: string) => {
  const encryptedKeypair = localStorage.getItem("keypair");
  const iv = localStorage.getItem("iv");
  const decipher = createDecipheriv("aes256", password, iv);
  const decyptedKeyString =
    decipher.update(encryptedKeypair, "hex", "utf-8") + decipher.final("utf8");
  console.log(JSON.parse(decyptedKeyString));
  const decryptedKeypair = new Keypair(JSON.parse(decyptedKeyString));
  console.log(decryptedKeypair);
};
export default decryptPassword;
