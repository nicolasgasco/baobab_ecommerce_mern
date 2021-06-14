import { useState, useContext, useEffect } from "react";
import AuthContext from "./auth-context";
import ModalContext from "./modal-context";
import jwt_decode from "jwt-decode";

const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [openLogin, setOpenLogin] = useState(true);
  const [openSignup, setOpenSignup] = useState(false);
  let userName = "";

  const { handleModalText } = useContext(ModalContext);

  const loginUser = (userData) => {
    console.log(userData);
    console.log("login");
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
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
        if (token)
          userName = `${
            decodedToken.name.charAt(0).toUpperCase() +
            decodedToken.name.substring(1)
          } ${
            decodedToken.surname.charAt(0).toUpperCase() +
            decodedToken.surname.substring(1)
          }`;
        localStorage.setItem("token", token);
        return res.json();
      })
      .then((res) => {
        if (!res.success) throw new Error(res.msg);
        console.log("success");
        handleModalText(`Welcome, ${userName}!`);
      })
      .catch((error) => {
        localStorage.removeItem("token");
        console.log("An error ocurred: " + error.message);
        handleModalText(`${error.message}!`);
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
        if (res.error) throw new Error(res.error);
        loginUser({ email: userData.email, password: userData.password });
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message.includes("Joi")) {
          handleModalText(
            "Something went wrong",
            `${error.message
              .split("(Joi):")[1]
              .replaceAll(",", ".\n")
              .split(".\n")}`
          );
        } else if (error.message.includes("not unique")) {
          handleModalText(
            "Something went wrong",
            `${error.message
              .split("email:")[1]
              .replaceAll(",", ".\n")
              .split(".\n")}`
          );
        }

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
        console.log("Logout successful");
        userName = "";
        localStorage.removeItem("token");
      })
      .catch((error) => {
        console.log("An error ocurred: " + error.message);
      });
  };

  const checkLogin = () => {
    console.log("check");
    fetch("/api/check")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.error) throw new Error(res.error);
        if (!res.session) {
          localStorage.removeItem("token");
          setToken("");
        }
        console.log(res);
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

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsLogged(!!localStorage.getItem("token"));
  }, [localStorage, token]);

  const authContext = {
    token,
    userName,
    isLogged,
    openLogin,
    openSignup,
    loginUser,
    signupUser,
    logoutUser,
    handleOpenLogin,
    handleOpenSignup,
    checkLogin,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
