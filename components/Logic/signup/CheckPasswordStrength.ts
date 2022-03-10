import { PasswordStrengthObj } from "../../types";

const CheckPasswordStrength = (
  password: string,
  propsReqs: PasswordStrengthObj
) => {
  let reqs = propsReqs;
  const common = [
    "password",
    "123",
    "pass",
    "qwerty",
    "1q2w3e",
    "111",
    "0987",
    "asdf",
  ];
  for (let i = 0; i < Object.keys(reqs).length; i++) {
    let prop = Object.keys(reqs)[i];
    reqs[prop] = false;
  }
  if (password.length >= 12) {
    reqs.optimal_length = true;
  }
  if (password.length >= 8) {
    reqs.min_length = true;
  }
  if (password.search(/[0-9]/) > 0) {
    reqs.contain_num = true;
  }
  if (password.toLowerCase() != password) {
    reqs.contains_capital = true;
  }
  if (password.search("[$&+,:;=?@#|'<>.^*()%!-]") > 0) {
    reqs.contain_special = true;
  }
  reqs.not_generic = true;
  for (const phrase of common) {
    if (password.includes(phrase)) {
      reqs.not_generic = false;
    }
  }
  if (password.length < 4) {
    reqs.not_generic = false;
  } else if (password.search(/(?:(?:19)[0-9]{2})/) > 0) {
    reqs.not_generic = false;
  } else if (password.search(/(?:(?:20)[0-2][0-9])/) > 0) {
    reqs.not_generic = false;
  }
  if (reqs.contains_capital && reqs.contain_num && reqs.min_length) {
    reqs.good_mix = true;
  }
  console.log(reqs);
  return reqs;
};

export default CheckPasswordStrength;
