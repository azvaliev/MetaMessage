import { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import { pageProps } from "../lib/types";
import Link from "next/link";
import decryptPassword from "../lib/encryption/decryptPassword";
import { UserContext } from "../lib/UserContext";

const Login = (props: pageProps) => {
	const [password, setPassword] = useState("");
	const [showError, setShowError] = useState(false);

	const { mobile } = useContext(UserContext);

	const handleSubmit = () => {
		setPassword("");
		decryptPassword(password)
			.then(res => 
				props.onSignIn(res)
			)
			.catch(() => 
				setShowError(true)
			);
	};

	const checkEnter = (e: KeyboardEvent<HTMLInputElement>) => 
		e.key === "Enter" ? handleSubmit() : null;
	
	const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value.length > 2 ? setShowError(false) : null;
		setPassword(e.target.value);
	};

	return (
		<div className="flex flex-col text-white w-11/12 lg:w-1/2 mx-auto">
			<h1 className="text-5xl mt-8 mx-auto">Welcome</h1>
			<input
				type="password"
				name="password"
				placeholder={
					mobile ? "enter your password" : "Enter your password"
				}
				autoFocus={!mobile}
				value={password}
				onChange={handleTyping}
				onKeyDown={checkEnter}
				className={`
					text-xl mt-[30vh] px-2 w-5/6 lg:w-2/3 mx-auto bg-black 
					border-[1px] py-1 text-center sm:text-left outline-none
					${showError ? "border-red-500" : "border-blue-500"}
				`}
				maxLength={20}
			/>
			{showError && (
				<p className="text-center relative top-2 text-xl text-red-500">
          incorrect password, try again
				</p>
			)}
			{password.length >= 8 && (
				<button
					className="w-fit mt-4 bg-blue-500 rounded-md px-4 py-2 text-3xl lg:text-2xl mx-auto"
					onClick={handleSubmit}
				>
          Login
				</button>
			)}

			<h5 className="text-xl mx-auto mt-4">
        Or.. tap{" "}
				<Link href="/signup">
					<span className="font-semibold underline text-blue-400 cursor-pointer">
            here
					</span>
				</Link>{" "}
        to sign up
			</h5>
		</div>
	);
};

export default Login;
