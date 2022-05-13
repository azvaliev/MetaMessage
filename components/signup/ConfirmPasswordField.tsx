import { KeyboardEvent, useEffect, ChangeEventHandler, useContext } from "react";
import { UserContext } from "../../lib/UserContext";
import PasswordBarIndicator from "./PasswordBarIndicator";

interface Props {
  passwordOG: string;
  confirmPassword: string;
  setConfirmPassword: ChangeEventHandler;
  onPasswordConfirmed(v: boolean): void;
  onSubmit(): void;
}

const checkConfirmPassword = (password: string, confirmPassword: string) => 
	password === confirmPassword && confirmPassword.length > 0 ? 1 : 0;


const ConfirmPasswordField = (props: Props) => {

	const { mobile } = useContext(UserContext);

	// Literally just checks if they are equal
	const confirmPasswordScore = checkConfirmPassword(
		props.passwordOG,
		props.confirmPassword
	);

	// if confirmed and original password is identical, score of 3 and let signup component know
	useEffect(() => {
		confirmPasswordScore
			? props.onPasswordConfirmed(true)
			: props.onPasswordConfirmed(false);
	}, [props.confirmPassword]);

	// allow users to hit enter to submit
	const checkEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		e.key === "Enter" && confirmPasswordScore ? props.onSubmit() : null;
	};

	return (
		<>
			<input
				type="password"
				name="confirmPassword"
				placeholder={mobile ? "confirm password" : "Confirm password"}
				value={props.confirmPassword}
				onChange={props.setConfirmPassword}
				onKeyDown={checkEnter}
				className={`
					text-xl mt-6 px-2 w-full bg-black border-gray-600 border-[0.2px]
					outline-none py-1 ${mobile ? "text-center" : "text-left"}`
				}
				maxLength={20}
			/>
			<PasswordBarIndicator score={confirmPasswordScore} halfBar={true} />
		</>
	);
};
export default ConfirmPasswordField;
