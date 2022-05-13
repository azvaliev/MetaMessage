import { ChangeEvent, useContext, useState } from "react";
import PasswordField from "../components/signup/PasswordField";
import checkPasswordStrength from "../lib/account/checkPasswordStrength";
import { PasswordStrengthObj, pageProps } from "../lib/types";
import ConfirmPasswordField from "../components/signup/ConfirmPasswordField";
import { UserContext } from "../lib/UserContext";

export default function SignUp(props: pageProps) {

	const { mobile } = useContext(UserContext);

	const [passwordSecLevel, setPasswordSecLevel] = useState<PasswordStrengthObj>(
		{
			minLength: false,
			containsNum: false,
			containsSpecial: false,
			containsCapital: false,
			optimalLength: false
		}
	);
	const [password, setPassword] = useState({
		password: "",
		confirmPassword: ""
	});
	const [passwordValid, setPasswordValid] = useState({
		password: false,
		confirmPassword: false
	});

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordSecLevel(
			checkPasswordStrength(e.target.value, passwordSecLevel)
		);
		setPassword({ ...password, password: e.target.value });
	};
	const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword({ ...password, confirmPassword: e.target.value });
	};
	const handleSubmitPassword = () => {
		props.onSetPassword(password.password);
		// Send user to homepage
	};

	return (
		<div className="text-white text-center md:w-5/6 lg:w-1/2 md:mx-auto">
			<h1 className="text-4xl py-2 pt-6 underline">Create a password</h1>
			<p className="p-2 text-lg px-[2vw] md:px-[8vw] lg:px-[2vw]">
        Your unique private keys for &lsquo;signing&lsquo; a message are stored
        locally. However, locally stored keys can be vulnerable if not
        encrypted.
			</p>
			<div className="w-11/12 mt-[5vh] md:w-3/4 lg:w-2/3 mx-auto">
				<PasswordField
					password={password.password}
					setPassword={handleChangePassword}
					strength={passwordSecLevel}
					mobile={mobile}
					onPasswordAccepted={(v: boolean) =>
						setPasswordValid({ ...passwordValid, password: v })
					}
				/>
				{/* only show confirm field when password is minimum strength */}
				{password.password.length > 3 && (
					<ConfirmPasswordField
						passwordOG={password.password}
						confirmPassword={password.confirmPassword}
						onSubmit={handleSubmitPassword}
						setConfirmPassword={handleChangeConfirmPassword}
						mobile={mobile}
						onPasswordConfirmed={(v: boolean) =>
							setPasswordValid({ ...passwordValid, confirmPassword: v })
						}
					/>
				)}
				{/* Hide/disable button until password is min strength & confirmed */}
				<button
					onClick={passwordValid.confirmPassword ? handleSubmitPassword : null}
					className={`mt-8 bg-blue-500 rounded-md px-4 py-2 text-3xl font-semibold ${
						passwordValid.password
							? passwordValid.confirmPassword
								? ""
								: "btn-disabled line-through"
							: "invisible"
					}`}
				>
          Submit
				</button>
			</div>
		</div>
	);
}
