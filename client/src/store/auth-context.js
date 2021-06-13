import React from "react";

const AuthContext = React.createContext({
  token: "",
  userName: "",
  isLoggedIn: false,
  openLogin: true,
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
