import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const loginUser = () => {
    return "ciao";
  };
  const logoutUser = () => {};

  const handleOpenLogin = () => {
    setOpenLogin((prevState) => {
      return !prevState;
    });
  };

  const handleOpenSignup = () => {
    setOpenSignup((prevState) => {
      return !prevState;
    });
  };

  const authContext = {
    isLoggedIn: isLogged,
    openLogin,
    openSignup,
    loginUser,
    logoutUser,
    handleOpenLogin,
    handleOpenSignup,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
