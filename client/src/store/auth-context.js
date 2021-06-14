import React from "react";

const AuthContext = React.createContext({
  token: "",
  userName: "",
  isLoggedIn: !!localStorage.getItem("token"),
  openLogin: true,
  openSignup: false,
  loginUser: (userData) => {},
  logoutUser: () => {},
  signupUser: (userData) => {},
  handleOpenLogin: () => {},
  handleOpenSignup: () => {},
  checkLogin: () => {},
});

export default AuthContext;
