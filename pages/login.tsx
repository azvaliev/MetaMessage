import { useState } from "react";
import { Main } from "../components/StyledHome";
import { Props } from "../components/types";
import Link from "next/link";
import decryptPassword from "../components/Logic/local_encryption/decryptPassword";

const Login = (props: Props) => {
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    decryptPassword("Le2003go")
      .then((res) => {
        const [tempKeypair, tempPubkey] = res;
        props.onSignIn(tempKeypair, tempPubkey);
      })
      .catch(() => setShowError(true));
  };

  return (
    <Main className="flex flex-col text-white w-11/12 lg:w-1/2 mx-auto">
      <h1 className="text-3xl my-4 mx-auto">Welcome</h1>
      <input
        type="password"
        placeholder="enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`text-xl mt-6 px-2 w-full lg:w-2/3 mx-auto bg-black text-center outline-none border-1 ${
          showError ? "border-red-500" : "border-blue-500"
        } py-1`}
        maxLength={20}
      />
      {showError && (
        <p className="text-center my-2 text-xl text-red-500">
          incorrect password, try again
        </p>
      )}
      {password.length >= 8 && (
        <button
          className={`w-fit mt-8 bg-blue-500 rounded-md px-4 py-2 text-3xl mx-auto`}
          onClick={handleSubmit}
        >
          Sign in
        </button>
      )}

      <h5 className="text-xl mx-auto mt-8">
        Or.. tap{" "}
        <Link href="/signup">
          <span className="font-semibold underline text-blue-400 cursor-pointer">
            here
          </span>
        </Link>{" "}
        to sign up
      </h5>
    </Main>
  );
};

export default Login;
