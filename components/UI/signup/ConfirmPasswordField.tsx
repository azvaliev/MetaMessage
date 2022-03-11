import { useEffect, ChangeEventHandler } from "react";
import PasswordBarIndicator from "./PasswordBarIndicator";
import checkConfirmPassword from "../../Logic/signup/CheckConfirmPassword";

interface Props {
  passwordOG: string;
  confirmPassword: string;
  setConfirmPassword: ChangeEventHandler;
  onPasswordConfirmed: Function;
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

  return (
    <>
      <input
        type="password"
        placeholder="confirm password"
        value={props.confirmPassword}
        onChange={props.setConfirmPassword}
        className="text-xl mt-6 px-2 w-full bg-black text-center outline-none py-1"
        maxLength={20}
      />
      <PasswordBarIndicator score={confirmPasswordScore} halfBar={true} />
    </>
  );
};
export default ConfirmPasswordField;
