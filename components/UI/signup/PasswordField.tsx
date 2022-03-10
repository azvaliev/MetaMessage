import { ChangeEventHandler } from "react";
import PasswordBarIndicator from "./PasswordBarIndicator";
import { PasswordStrengthObj } from "../../types";
import PasswordStrengthHint from "./PasswordStrengthHint";

interface Props {
  password: string;
  setPassword: ChangeEventHandler;
  strength: PasswordStrengthObj;
}

const PasswordField = (props: Props) => {
  const calculateStrengthScore = (strengthArr: Array<boolean>) => {
    // calculate the number of password strength reqs that are passed
    const total = strengthArr.filter((v) => v === true).length;
    // divide this by 3 to create a score for indicator
    if (props.password.length > 3) {
      return Math.round(total / 2.3);
    }
    return -1;
  };
  const strengthScore = calculateStrengthScore(Object.values(props.strength));
  console.log(strengthScore);
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
      <PasswordBarIndicator strengthScore={strengthScore} />
      <PasswordStrengthHint
        strength={props.strength}
        strengthScore={strengthScore}
      />
    </>
  );
};
export default PasswordField;
