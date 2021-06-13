import { useState, useContext } from "react";
import AuthContext from "./auth-context";
import ModalContext from "./modal-context";
import jwt_decode from "jwt-decode";

const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [openLogin, setOpenLogin] = useState(true);
  const [openSignup, setOpenSignup] = useState(false);
  let userName = "";

  const { handleModalText } = useContext(ModalContext);

  const loginUser = (userData) => {
    setIsLogged(false);
    console.log("login");
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.error);
        }
        let decodedToken;
        let token;
        // This is the token
        for (const header of res.headers) {
          if (header[0] === "x-auth-token") {
            token = header[1];
            decodedToken = jwt_decode(header[1]);
            setToken(decodedToken);
          }
        }
        if (token) userName = `${decodedToken.name} ${decodedToken.surname}`;
        localStorage.setItem("token", token);
        return res.json();
      })
      .then((res) => {
        if (!res.success) throw new Error(res.error);
        console.log("success");
        setIsLogged(true);
        handleModalText(`Welcome, ${userName}!`);
      })
      .catch((error) => {
        console.log("An error ocurred: " + error.message);
        setIsLogged(false);
        handleModalText(`Something went wrong!`);
        userName = "";
      });
  };

  const signupUser = (userData) => {
    console.log("signin");
    fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        // This is the token
        for (const header of res.headers) {
          if (header[0] === "x-auth-token") {
            console.log(header[1]);
          }
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.error) throw new Error(res.error);
        loginUser({ email: userData.email, password: userData.password });
      })
      .catch((error) => {
        console.log("An error ocurred: " + error.message);
      });
  };
  const logoutUser = () => {
    console.log("logout");
    fetch("/api/logout", {
      method: "DELETE",
    })
      .then((res) => {
        // This is the token
        for (const header of res.headers) {
          if (header[0] === "x-auth-token") {
            console.log(header[1]);
          }
        }
        return res.json();
      })
      .then((res) => {
        if (res.error) throw new Error(res.error);
        setIsLogged(false);
        console.log("Logout successful");
        userName = "";
        localStorage.removeItem("token");
      })
      .catch((error) => {
        console.log("An error ocurred: " + error.message);
      });
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setOpenSignup(false);
  };
  const handleOpenSignup = () => {
    setOpenLogin(false);
    setOpenSignup(true);
  };

  const authContext = {
    token,
    isLogged,
    openLogin,
    openSignup,
    userName,
    loginUser,
    signupUser,
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
