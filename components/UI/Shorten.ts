const ShortenPubkey = (key: string, intro: boolean, mobile: boolean) => {
  if (intro) {
    return `Welcome back, ${
      key.substring(0, 12) + "..." + key.substring(key.length - 6)
    }`;
  } else {
    return key.substring(0, 12) + "..." + key.substring(key.length - 6);
  }
};

const ShortenMessage = (message: string, mobile: boolean) => {
  let charlimit: number;
  mobile ? (charlimit = 35) : (charlimit = 70);
  if (message.length > charlimit) {
    return `${message.substring(0, charlimit - 6)}...`;
  }
  return message;
};

export { ShortenMessage, ShortenPubkey };
