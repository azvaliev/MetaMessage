import { PasswordStrengthObj } from "../types";

const checkPasswordStrength = (
	password: string,
	propsReqs: PasswordStrengthObj
) => {
	const reqs = { ...propsReqs };

	// reset the reqs object so assigning false later is not neccesary
	for (const prop of Object.keys(reqs)) {
		reqs[prop] = false;
	}
	if (password.length >= 12) {
		reqs.optimalLength = true;
	}
	if (password.length >= 8) {
		reqs.minLength = true;
	}
	if (password.search(/[0-9]/) > 0) {
		reqs.containsNum = true;
	}
	if (password.toLowerCase() != password) {
		reqs.containsCapital = true;
	}
	if (password.search("[$&+,:;=?@#|'<>.^*()%!-]") > 0) {
		reqs.containsSpecial = true;
	}
	// factor the combination of good password practices into score
	return reqs;
};

export default checkPasswordStrength;
