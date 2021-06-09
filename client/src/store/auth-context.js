import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  openLogin: false,
  openSignup: false,
  loginUser: () => {},
  logoutUser: () => {},
  handleOpenLogin: () => {},
});

export default AuthContext;
