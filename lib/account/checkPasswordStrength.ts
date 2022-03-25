import { PasswordStrengthObj } from "../types";

const checkPasswordStrength = (
	password: string,
	propsReqs: PasswordStrengthObj
) => {
	const reqs = propsReqs;
	// list of common words that should be avoided
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
	// reset the reqs object so assigning false later is not neccesary
	for (let i = 0; i < Object.keys(reqs).length; i++) {
		const prop = Object.keys(reqs)[i];
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
	// factor the combination of good password practices into score
	if (reqs.contains_capital && reqs.contain_num && reqs.min_length) {
		reqs.good_mix = true;
	}
	return reqs;
};

export default checkPasswordStrength;
