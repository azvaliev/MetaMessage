import { ChangeEventHandler } from "react";
import PasswordIndicator from "./PasswordIndicator";

const PasswordField = (props: {
  password: string;
  setPassword: ChangeEventHandler;
  strength: Object;
}) => {
  const calculateStrengthScore = (strengthArr: Array<boolean>) => {
    const total = strengthArr.filter((v) => v === true).length;
    return Math.round(total / 3);
  };

  return (
    <>
      <input
        type="password"
        placeholder="password"
        value={props.password}
        onChange={props.setPassword}
        className="text-xl mt-6 px-2 w-full bg-black border-1 border-gray-500"
      />
      <PasswordIndicator
        strength={calculateStrengthScore(Object.values(props.strength))}
      />
    </>
  );
};
export default PasswordField;
