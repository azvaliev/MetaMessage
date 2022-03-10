import { PasswordStrengthObj } from "../../types";

interface Props {
  strength: PasswordStrengthObj;
  strengthScore: number;
}
const formattedReqs = [
  "At least 8 characters",
  "Over 12 characters",
  "Contains a number",
  "Contains a special character",
  "Not generic i.e.(password123)",
  "Contains a capital",
];

const PasswordStrengthHint = (props: Props) => {
  let bgColor = "";
  props.strengthScore <= 1
    ? (bgColor = "bg-red-500")
    : props.strengthScore <= 2
    ? (bgColor = "bg-yellow-500")
    : (bgColor = "bg-green-500");

  return (
    <div className={`w-full ${bgColor} flex flex-col text-white`}>
      {formattedReqs.map((req, i) => {
        if (!Object.values(props.strength)[i]) {
          return (
            <div className="flex flex-row" key={i}>
              {"\u2715"}
              {req}
            </div>
          );
        }
      })}
    </div>
  );
};

export default PasswordStrengthHint;
