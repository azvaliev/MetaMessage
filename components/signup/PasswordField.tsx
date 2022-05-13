import { ChangeEventHandler, useContext } from "react";
import { UserContext } from "../../lib/UserContext";

interface Props {
  password: string;
  setPassword: ChangeEventHandler;
}

const PasswordField = (props: Props) => {

	const { mobile } = useContext(UserContext);

	return (
		<>
			<input
				type="password"
				name="password"
				placeholder={mobile ? "password" : "Create a password"}
				autoFocus={!mobile}
				value={props.password}
				onChange={props.setPassword}
				className="
					text-xl mt-6 px-2 w-full bg-black border-gray-600 border-[0.2px]
					text-center py-2 md:text-left md:py-1 outline-none"
				maxLength={20}
			/>
		</>
	);
};
export default PasswordField;
