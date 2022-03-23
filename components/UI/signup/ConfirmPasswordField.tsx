import { KeyboardEvent, useEffect, ChangeEventHandler } from "react";
import PasswordBarIndicator from "./PasswordBarIndicator";
import checkConfirmPassword from "../../Logic/signup/CheckConfirmPassword";

interface Props {
  passwordOG: string;
  confirmPassword: string;
  setConfirmPassword: ChangeEventHandler;
  onPasswordConfirmed: Function;
  onSubmit: Function;
  mobile: boolean;
}

const ConfirmPasswordField = (props: Props) => {
	// Literally just checks if they are equal
	const confirmPasswordScore = checkConfirmPassword(
		props.passwordOG,
		props.confirmPassword
	);

	// if confirmed and original password is identical, score of 3 and let signup component know
	useEffect(() => {
		confirmPasswordScore === 3
			? props.onPasswordConfirmed(true)
			: props.onPasswordConfirmed(false);
	}, [props.confirmPassword]);

	// allow users to hit enter to submit
	const checkEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		e.key === "Enter" && confirmPasswordScore === 3 ? props.onSubmit() : null;
	};

	return (
		<>
			<input
				type="password"
				name="confirmPassword"
				placeholder={props.mobile ? "confirm password" : "Confirm password"}
				value={props.confirmPassword}
				onChange={props.setConfirmPassword}
				onKeyDown={checkEnter}
				className={`text-xl mt-6 px-2 w-full bg-black border-gray-600 border-[0.2px] ${
					props.mobile ? "text-center" : "text-left"
				} outline-none py-1`}
				maxLength={20}
			/>
			<PasswordBarIndicator score={confirmPasswordScore} halfBar={true} />
		</>
	);
};
export default ConfirmPasswordField;
