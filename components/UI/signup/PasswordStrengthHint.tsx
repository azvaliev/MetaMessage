import { PasswordStrengthObj } from "../../types";

interface Props {
  strength: PasswordStrengthObj;
  strengthScore: number;
}
const formattedReqs = [
  "At least 8 characters",
  "Include a number",
  "Include a special character",
  "Avoid common phrases (password123, year)",
  "Include a capital",
];

const PasswordStrengthHint = (props: Props) => {
  let bgColor = "";
  props.strengthScore <= 1
    ? (bgColor = "bg-red-500 border-red-500")
    : (bgColor = "bg-blue-500 border-blue-500");

  // No hints needed for passwords meeting all reqs score > 3
  // Or when password is just started typing <4 characters, score of -1
  if (props.strengthScore < 3 && props.strengthScore > -1) {
    return (
      <div
        className={`w-full ${bgColor} bg-opacity-70 border-1 mt-2 rounded-md flex flex-col text-white`}
      >
        {formattedReqs.map((req, i) => {
          if (!Object.values(props.strength)[i]) {
            return (
              <div className="flex flex-row" key={i}>
                {props.strengthScore > 1 ? "Reccomended: " : "\u2715 "}
                {req}
              </div>
            );
          }
        })}
      </div>
    );
  }
  return null;
};

export default PasswordStrengthHint;
