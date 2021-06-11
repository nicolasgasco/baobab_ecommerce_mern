import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  openLogin: false,
  openSignup: false,
  openAuth: false,
  loginUser: () => {},
  logoutUser: () => {},
  signupUser: () => {},
  handleOpenLogin: () => {},
  handleOpenSignup: () => {},
  handleOpenAuth: () => {},
});

export default AuthContext;
