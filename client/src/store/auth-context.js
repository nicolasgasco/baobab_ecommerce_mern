import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  openLogin: false,
  openSignup: false,
  openAuth: false,
  loginUser: () => {},
  logoutUser: () => {},
  handleOpenLogin: () => {},
  handleOpenSignup: () => {},
  handleOpenAuth: () => {},
});

export default AuthContext;
