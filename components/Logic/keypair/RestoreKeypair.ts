import { Keypair } from "@solana/web3.js";

const RestoreKeypair = (strKeypair: string) => {
  const kp = Keypair.fromSecretKey(
    new Uint8Array(Object.values(JSON.parse(strKeypair)._keypair.secretKey))
  );
  return kp;
};
export default RestoreKeypair;
