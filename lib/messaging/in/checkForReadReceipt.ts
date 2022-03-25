import { Account, burn, closeAccount } from "@solana/spl-token";
import { Keypair, Connection, PublicKey} from "@solana/web3.js";

const checkForReadReceipt = async (
	connection: Connection, 
	accDetail: Account,
	mint: PublicKey,
	mintAuthority: PublicKey,
	wallet: Keypair,
	sender: PublicKey
) => {
	if (accDetail.address.toString() === mintAuthority.toString()) {
		console.log("receipt");
		// In case of original token sent back as read receipt
		// Burn localstorage entry
		await burn(connection, wallet, accDetail.address, mint, wallet, 1);
		await closeAccount(connection, wallet, accDetail.address, null, wallet);
		const sentMessages = JSON.parse(localStorage.getItem(sender.toString()));
		sentMessages.shift();
		localStorage.setItem(sender.toString(), JSON.stringify(sentMessages));
		return true;
	}
	return false;
};

export default checkForReadReceipt;