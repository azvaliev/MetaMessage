import { PasswordStrengthObj } from "../../types";

interface Props {
  strength: PasswordStrengthObj;
  strengthScore: number;
}
const formattedReqs = [
  "At least 8 characters",
  "Include a number (0-9)",
  "Include a special character ^&$*",
  "Avoid common phrases (123, year)",
  "Include a capital letter",
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
        className={`w-fit mx-auto px-4 py-1 ${bgColor} bg-opacity-75 border-1 mt-3 rounded-md flex flex-col text-white`}
      >
        {props.strengthScore > 1 && (
          <h5 className="border-b-[0.2px] border-gray-300 font-semibold">
            Reccomended
          </h5>
        )}
        {formattedReqs.map((req, i) => {
          if (!Object.values(props.strength)[i]) {
            return (
              <div className="flex flex-row text-center" key={i}>
                <p className="mx-auto">
                  {props.strengthScore <= 1 && "\u2715 "}
                  {req}
                </p>
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
