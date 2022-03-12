const checkConfirmPassword = (password: string, confirmPassword: string) => {
  if (password === confirmPassword) {
    return 3;
  }
  return 1;
};

export default checkConfirmPassword;
