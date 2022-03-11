const {
  createHash,
  createDecipheriv,
  randomBytes,
  createCipheriv,
} = require("crypto");
import { Keypair } from "@solana/web3.js";
import { toArrayBuffer, toBuffer } from "./BufferConv";
import { getIVStore, updateIVStore } from "./ManageIndexDB";

const decryptPassword = async (password: string) => {
  const encryptedKeypair = localStorage.getItem("keypair");
  // Grab encrypted keypair string from localstorage
  let iv = await getIVStore();
  !iv ? (iv = null) : (iv = toBuffer(iv));
  // iv will either return false or the proper string, depending on if
  // target browser supports IndexedDB
  const key = createHash("sha256").update(password).digest("hex").substr(0, 32);
  // Turning a normal password into hash used to decrypt
  const decipher = createDecipheriv("aes256", key, iv);
  const decyptedKeyString =
    decipher.update(encryptedKeypair, "hex", "utf8") + decipher.final("utf8");
  // TODO - Validate if this decrypted key string is a real keypair. i.e. the password was accurate
  // TODO - Perhaps do the above through creating two new keypairs using the string and comparing equality

  // Convert JSON parsed object "keypair" into Solana Keypair type
  const decryptedKeypair = Keypair.fromSecretKey(
    new Uint8Array(
      Object.values(JSON.parse(decyptedKeyString)._keypair.secretKey)
    )
  );
  console.log(decryptedKeypair);
  // As soon as decryption is done, re-encrypt with a new IV to protect user password security
  ReEncrypt(password, decyptedKeyString, iv);
  return [decryptedKeypair, decryptedKeypair.publicKey];
};
const ReEncrypt = (password: string, keypairString: string, iv: Buffer) => {
  let newIV: Buffer;
  // set iv to null if browser does not support IndexedDB
  if (iv != null) {
    newIV = randomBytes(16);
    // add new iv to IndexedDB
    updateIVStore(toArrayBuffer(newIV));
  } else {
    newIV = null;
  }
  const key = createHash("sha256").update(password).digest("hex").substr(0, 32);
  const cipher = createCipheriv("aes256", key, newIV);
  const encryptedKeypair =
    cipher.update(keypairString, "utf8", "hex") + cipher.final("hex");
  // Update local keypair with newly encrypted version
  localStorage.setItem("keypair", encryptedKeypair);
};

export default decryptPassword;
