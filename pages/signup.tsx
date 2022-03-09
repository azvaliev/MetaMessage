import { Main } from "../components/StyledHome";
import { useState } from "react";

export default function SignUp(props) {
  const [passwordSecLevel, setPasswordSetLevel] = useState({
    min_length: false,
    optimal_length: false,
    contain_num: false,
    contain_special: false,
    not_generic: false,
  });
  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Main className="text-white text-center">
      <h1 className="text-3xl py-2 underline">Create a password</h1>
      <p className="py-2 text-lg">
        Your unique private keys for &lsquo;signing&lsquo; a message are stored
        locally. However, locally stored keys can be vulnerable if not
        encrypted.
      </p>
      <h2 className="text-2xl py-4">
        Please create a password below to ensure these stay secure
      </h2>
      <div className="w-3/4 mx-auto">
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChangePassword}
          className="text-xl mt-6 px-2 w-full bg-black border-1 border-gray-500"
        />
        <div className="flex flex-row w-full">
          <div className="w-1/3 h-1 mt-2 rounded-md bg-red-500"></div>
          <div className="w-1/3 h-1 mt-2 rounded-md bg-yellow-500"></div>
          <div className="w-1/3 h-1 mt-2 rounded-md bg-green-500"></div>
        </div>
        <input
          type="password"
          placeholder="confirm"
          className="text-xl mt-6 px-2 w-full bg-black border-1 border-gray-500"
        />
      </div>
    </Main>
  );
}
