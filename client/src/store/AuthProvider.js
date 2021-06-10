import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(true);
  const [openAuth, setOpenAuth] = useState(false);

  const loginUser = () => {
    return "ciao";
  };
  const logoutUser = () => {};

  const handleOpenAuth = () => {
    setOpenAuth((prevState) => {
      return !prevState;
    });
    setOpenLogin(true);
  };

  const handleOpenLogin = () => {
    setOpenLogin((prevState) => {
      return !prevState;
    });
    setOpenSignup((prevState) => {
      return !prevState;
    });
  };

  const handleOpenSignup = () => {
    setOpenLogin((prevState) => {
      return !prevState;
    });
  };

  const authContext = {
    isLoggedIn: isLogged,
    openAuth,
    openLogin,
    openSignup,
    loginUser,
    logoutUser,
    handleOpenAuth,
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
