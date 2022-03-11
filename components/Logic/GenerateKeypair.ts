import { Keypair } from "@solana/web3.js";

const GenerateKeypair = () => {
  let keypair = Keypair.generate();
  return keypair;
};

export default GenerateKeypair;

