import { Keypair } from "@solana/web3.js";

const generateKeypair = () => {
	const keypair = Keypair.generate();
	return keypair;
};

export default generateKeypair;
