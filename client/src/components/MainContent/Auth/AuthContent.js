import React, { useContext, useEffect } from "react";
import Loginform from "./LoginForm";
import SignupForm from "./SignupForm";

import AuthContext from "../../../store/auth-context";

const AuthContent = () => {
  const { openLogin, checkLogin } = useContext(AuthContext);

  // Check if user is still loggedin
  useEffect(() => {
    checkLogin();
  }, []);

  return <>{openLogin ? <Loginform /> : <SignupForm />}</>;
};

export default AuthContent;
