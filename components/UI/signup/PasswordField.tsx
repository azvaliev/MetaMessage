import { ChangeEventHandler, useState, useEffect } from "react";
import PasswordBarIndicator from "./PasswordBarIndicator";
import { PasswordStrengthObj } from "../../types";
import PasswordStrengthHint from "./PasswordStrengthHint";

interface Props {
  password: string;
  setPassword: ChangeEventHandler;
  strength: PasswordStrengthObj;
  onPasswordAccepted(v: boolean): void;
  mobile: boolean;
}

const calculateStrengthScore = (
	strengthArr: Array<boolean>,
	passLength: number
) => {
	// calculate the number of password strength reqs that are met (true)
	const total = strengthArr.filter((v) => v === true).length;
	// divide this by 2.3 to create a score for indicator
	if (passLength > 3) {
		return Math.round(total / 2.3);
	}
	return -1;
};

const PasswordField = (props: Props) => {
	const [strengthScore, setStrengthScore] = useState(
		calculateStrengthScore(Object.values(props.strength), props.password.length)
	);
	// Calculate new strength score on password change
	useEffect(() => {
		setStrengthScore(
			calculateStrengthScore(
				Object.values(props.strength),
				props.password.length
			)
		);
	}, [props.password]);
	// Let the signup component know if new strength score is acceptable
	useEffect(() => {
		strengthScore >= 2
			? props.onPasswordAccepted(true)
			: props.onPasswordAccepted(false);
	}, [strengthScore]);

	return (
		<>
			<input
				type="password"
				name="password"
				placeholder={props.mobile ? "password" : "Create a password"}
				autoFocus={!props.mobile}
				value={props.password}
				onChange={props.setPassword}
				className="text-xl mt-6 px-2 w-full bg-black border-gray-600 border-[0.2px] text-center py-2 md:text-left md:py-1 outline-none"
				maxLength={20}
			/>
			<PasswordBarIndicator score={strengthScore} />
			<PasswordStrengthHint
				strength={props.strength}
				strengthScore={strengthScore}
			/>
		</>
	);
};
export default PasswordField;
