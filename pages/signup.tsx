import { ChangeEvent, useState } from "react";
import PasswordField from "../components/signup/PasswordField";
import { PageProps } from "../lib/types";
import ConfirmPasswordField from "../components/signup/ConfirmPasswordField";

export default function SignUp (props: PageProps) {

	const [password, setPassword] = useState({
		password: "",
		confirmPassword: ""
	});
	const [passwordValid, setPasswordValid] = useState(false);

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => 
		setPassword({ ...password, password: e.target.value });
	
	const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => 
		setPassword({ ...password, confirmPassword: e.target.value });
	
	const handleSubmitPassword = () => 
		props.onSetPassword(password.password);

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
				/>
				<ConfirmPasswordField
					passwordOG={password.password}
					confirmPassword={password.confirmPassword}
					onSubmit={handleSubmitPassword}
					setConfirmPassword={handleChangeConfirmPassword}
					onPasswordConfirmed={(res: boolean) => setPasswordValid(res)}
				/>
				<button
					onClick={passwordValid ? handleSubmitPassword : null}
					className={`mt-8 bg-blue-500 rounded-md px-4 py-2 text-3xl font-semibold ${
						passwordValid
							? ""
							: "btn-disabled line-through"
					}`}
				>
          Submit
				</button>
			</div>
		</div>
	);
}
