import { ChangeEventHandler, useState, useEffect } from "react";
import PasswordBarIndicator from "./PasswordBarIndicator";
import { PasswordStrengthObj } from "../../types";
import PasswordStrengthHint from "./PasswordStrengthHint";
import { calculateStrengthScore } from "../../Logic/signup/CheckPasswordStrength";

interface Props {
  password: string;
  setPassword: ChangeEventHandler;
  strength: PasswordStrengthObj;
  onPasswordAccepted: Function;
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
        placeholder="password"
        value={props.password}
        onChange={props.setPassword}
        className="text-xl mt-6 px-2 w-full bg-black text-center outline-none py-1"
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
