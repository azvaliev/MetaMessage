import GenerateKeypair from "../keypair/GenerateKeypair";
import { toArrayBuffer } from "./BufferConv";
import { createIVStore } from "../account/ManageIndexDB";

const { createCipheriv, randomBytes, createHash } = require("crypto");

const encryptStorePassword = async (password: string) => {
  // This function is for first-time signup
  const keypair = GenerateKeypair();
  const pubkey = keypair.publicKey;
  const key = createHash("sha256").update(password).digest("hex").substr(0, 32);
  let iv = randomBytes(16);
  const ivBArray = toArrayBuffer(iv);
  let res = await createIVStore(ivBArray);
  // If createIVStore returns false, the browser does not support IndexedDB
  // so keypair will be solely encrypted with password
  !res ? (iv = null) : null;
  const cipher = createCipheriv("aes256", key, iv);
  const encryptedKeypair =
    cipher.update(JSON.stringify(keypair), "utf8", "hex") + cipher.final("hex");
  localStorage.setItem("keypair", encryptedKeypair);
  // Put encrypted keypair into localstorage, send unencrypted to state
  return [keypair, pubkey];
};

export default encryptStorePassword;
