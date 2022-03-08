const ShortenPubkey = (key: string, intro: boolean, mobile: boolean) => {
  if (mobile) {
    return key.substring(0, 12) + "..." + key.substring(key.length - 6);
  } else {
    if (intro) {
      return `Welcome back, ${
        key.substring(0, 12) + "..." + key.substring(key.length - 6)
      }`;
    } else {
      if (window.innerWidth < 1100) {
        return key.substring(0, 12) + "..." + key.substring(key.length - 6);
      } else {
        return key;
      }
    }
  }
};

export default ShortenPubkey;
