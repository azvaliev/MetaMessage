import { Main } from "../components/StyledHome";
import { useState } from "react";
import PasswordField from "../components/UI/signup/PasswordField";
import CheckPasswordStrength from "../components/Logic/signup/CheckPasswordStrength";
import { Props } from "../components/types";

export default function SignUp(props: Props) {
  const [passwordSecLevel, setPasswordSecLevel] = useState({
    min_length: false,
    optimal_length: false,
    contain_num: false,
    contain_special: false,
    not_generic: false,
    contains_capital: false,
    good_mix: false,
  });
  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    setPasswordSecLevel(
      CheckPasswordStrength(e.target.value, passwordSecLevel)
    );
    setPassword(e.target.value);
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
          password={password}
          setPassword={handleChangePassword}
          strength={passwordSecLevel}
        />
      </div>
    </Main>
  );
}
