import generateKeypair from "../keypair/generateKeypair";
import { toArrayBuffer } from "./bufferConv";
import { createIVStore } from "../account/manageIndexedDB";

import { createCipheriv, randomBytes, createHash } from "crypto";

const encryptStorePassword = async (password: string) => {
	// This function is for first-time signup
	const keypair = generateKeypair();
	const key = createHash("sha256").update(password).digest("hex").substr(0, 32);
	let iv = randomBytes(16);
	const ivBArray = toArrayBuffer(iv);
	const res = await createIVStore(ivBArray);
	// If createIVStore returns false, the browser does not support IndexedDB
	// so keypair will be solely encrypted with password
	!res ? (iv = null) : null;
	const cipher = createCipheriv("aes256", key, iv);
	const encryptedKeypair =
    cipher.update(JSON.stringify(keypair), "utf8", "hex") + cipher.final("hex");
	localStorage.setItem("keypair", encryptedKeypair);
	// Put encrypted keypair into localstorage, send unencrypted to state
	return keypair;
};

export default encryptStorePassword;
