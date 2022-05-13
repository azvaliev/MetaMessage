const shortenPubkey = (key: string, intro: boolean, mobile: boolean) => {
	// Solana addresses are way too long to display
	// This function shortens them
	let subLen: number;
	mobile ? (subLen = 10) : (subLen = 12);
	if (intro) {
		// add welcome message if on homepage
		return `Welcome back, ${
			key.substring(0, subLen) + "..." + key.substring(key.length - 6)
		}`;
	} else {
		return key.substring(0, subLen) + "..." + key.substring(key.length - 6);
	}
};

const shortenMessage = (message: string, mobile: boolean) => {
	// This shortens the message for preview on homescreen
	let charlimit: number;
	mobile ? (charlimit = 35) : (charlimit = 70);
	if (message.length > charlimit) {
		return `${message.substring(0, charlimit - 6)}...`;
	}
	return message;
};

export { shortenMessage, shortenPubkey };
