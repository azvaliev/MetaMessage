const ShortenPubkey = (key: string, intro: boolean, mobile: boolean) => {
  let subLen: number;
  mobile ? (subLen = 10) : (subLen = 12);
  if (intro) {
    return `Welcome back, ${
      key.substring(0, subLen) + "..." + key.substring(key.length - 6)
    }`;
  } else {
    return key.substring(0, subLen) + "..." + key.substring(key.length - 6);
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
