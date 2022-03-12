import { ChangeEventHandler, useState, useEffect } from "react";
import PasswordBarIndicator from "./PasswordBarIndicator";
import { PasswordStrengthObj } from "../../types";
import PasswordStrengthHint from "./PasswordStrengthHint";
import { calculateStrengthScore } from "../../logic/signup/CheckPasswordStrength";

interface Props {
  password: string;
  setPassword: ChangeEventHandler;
  strength: PasswordStrengthObj;
  onPasswordAccepted: Function;
  mobile: boolean;
}

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
        placeholder={props.mobile ? "password" : "Create a password"}
        autoFocus={!props.mobile}
        value={props.password}
        onChange={props.setPassword}
        className={`text-xl mt-6 px-2 w-full bg-black border-gray-600 border-[0.2px] ${
          props.mobile ? "text-center py-2" : "text-left py-1"
        } outline-none`}
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
