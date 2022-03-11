import { Main } from "../components/StyledHome";
import { ChangeEvent, useState } from "react";
import PasswordField from "../components/UI/signup/PasswordField";
import CheckPasswordStrength from "../components/Logic/signup/CheckPasswordStrength";
import { PasswordStrengthObj, Props } from "../components/types";
import ConfirmPasswordField from "../components/UI/signup/ConfirmPasswordField";

export default function SignUp(props: Props) {
  const [passwordSecLevel, setPasswordSecLevel] = useState<PasswordStrengthObj>(
    {
      min_length: false,
      contain_num: false,
      contain_special: false,
      not_generic: false,
      contains_capital: false,
      good_mix: false,
      optimal_length: false,
    }
  );
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordValid, setPasswordValid] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordSecLevel(
      CheckPasswordStrength(e.target.value, passwordSecLevel)
    );
    setPassword({ ...password, password: e.target.value });
  };
  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, confirmPassword: e.target.value });
  };
  const handleSubmitPassword = () => {
    props.onSetPassword(password.password);
    // Send user to homepage
  };

  return (
    <Main className="text-white text-center lg:w-1/2 lg:mx-auto">
      <h1 className="text-3xl py-2 underline">Create a password</h1>
      <p className="py-2 text-lg">
        Your unique private keys for &lsquo;signing&lsquo; a message are stored
        locally. However, locally stored keys can be vulnerable if not
        encrypted.
      </p>
      <h2 className="text-2xl lg:w-3/4 mx-auto pt-8">
        Please create a password below to ensure these stay secure
      </h2>
      <div className="w-3/4 lg:w-2/3 mx-auto">
        <PasswordField
          password={password.password}
          setPassword={handleChangePassword}
          strength={passwordSecLevel}
          onPasswordAccepted={(v: boolean) =>
            setPasswordValid({ ...passwordValid, password: v })
          }
        />
        {/* only show confirm field when password is minimum strength */}
        {passwordValid.password && (
          <ConfirmPasswordField
            passwordOG={password.password}
            confirmPassword={password.confirmPassword}
            setConfirmPassword={handleChangeConfirmPassword}
            onPasswordConfirmed={(v: boolean) =>
              setPasswordValid({ ...passwordValid, confirmPassword: v })
            }
          />
        )}
        {/* Hide/disable button until password is min strength & confirmed */}
        <button
          onClick={passwordValid.confirmPassword ? handleSubmitPassword : null}
          className={`mt-8 bg-blue-500 rounded-md px-4 py-2 text-3xl ${
            passwordValid.password
              ? passwordValid.confirmPassword
                ? ""
                : "btn-disabled line-through"
              : "invisible"
          }`}
        >
          Confirm
        </button>
      </div>
    </Main>
  );
}
