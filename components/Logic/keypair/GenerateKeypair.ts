import { Keypair } from "@solana/web3.js";

const generateKeypair = () => {
  let keypair = Keypair.generate();
  return keypair;
};

export default generateKeypair;
