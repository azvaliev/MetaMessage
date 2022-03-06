const ShortenPubkey = (key: string, intro: boolean, mobile: boolean) => {
  if (mobile) {
    return key.substring(0, 12) + "..." + key.substring(key.length - 6);
  } else {
    if (intro) {
      console.log(window.innerWidth);
      if (window.innerWidth < 1100) {
        return `Welcome back, ${
          key.substring(0, 12) + "..." + key.substring(key.length - 6)
        }`;
      } else {
        return `Welcome back, ${key}`;
      }
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
