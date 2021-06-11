import React, { useContext } from "react";
import Loginform from "./LoginForm";
import SignupForm from "./SignupForm";

import AuthContext from "../../../store/auth-context";

const AuthContent = () => {
  const { openLogin, openSignup } = useContext(AuthContext);

  return (
    <>{openLogin ? <Loginform /> : <SignupForm />}</>
  );
};

export default AuthContent;
