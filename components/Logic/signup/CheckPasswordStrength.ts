import { PasswordStrengthObj } from "../../types";

const CheckPasswordStrength = (
  password: string,
  propsReqs: PasswordStrengthObj
) => {
  let reqs = propsReqs;
  for (let i = 0; i < Object.keys(reqs).length; i++) {
    let prop = Object.keys(reqs)[i];
    reqs[prop] = false;
  }
  if (password.length > 12) {
    reqs.optimal_length = true;
  }
  if (password.length > 8) {
    reqs.min_length = true;
  }
  if (password.search(/[0-9]/) > 0) {
    reqs.contain_num = true;
  }
  if (password.search("[A-Z]") > 0) {
    reqs.contains_capital = true;
  }
  if (password.search("[$&+,:;=?@#|'<>.^*()%!-]") > 0) {
    reqs.contain_special = true;
  }
  if (password.includes("password") || password.includes("1234")) {
    reqs.not_generic = false;
  } else {
    reqs.not_generic = true;
  }
  return reqs;
};

export default CheckPasswordStrength;
