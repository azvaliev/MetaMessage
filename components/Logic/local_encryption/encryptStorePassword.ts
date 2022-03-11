import GenerateKeypair from "../GenerateKeypair";

const { createCipheriv, randomBytes, createHash } = require("crypto");

const encryptStorePassword = (password: string) => {
  const keypair = GenerateKeypair();
  const pubkey = keypair.publicKey;
  const key = createHash("sha256").update(password).digest("hex").substr(0, 32);
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes256", key, iv);
  const encryptedKeypair =
    cipher.update(JSON.stringify(keypair), "utf8", "hex") + cipher.final("hex");
  // use base64 if neccesary
  localStorage.setItem("keypair", encryptedKeypair);
  localStorage.setItem("iv", iv.toString());
  return [keypair, pubkey];
};

export default encryptStorePassword;
