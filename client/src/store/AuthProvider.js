import { useState, useContext } from "react";
import AuthContext from "./auth-context";
import ModalContext from "./modal-context";
import jwt_decode from "jwt-decode";

const AuthProvider = (props) => {
  const [token, setToken] = useState("")
  const [isLogged, setIsLogged] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(true);
  const [openAuth, setOpenAuth] = useState(false);
  const [userName, setUserName] = useState("");

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
        let token;
        // This is the token
        for (const header of res.headers) {
          if (header[0] === "x-auth-token") {
            token = jwt_decode(header[1]);
          }
        }
        if (token) setUserName(`${token.name} ${token.surname}`);

        return res.json();
      })
      .then((res) => {
        if (!res.success) throw new Error(res.error);
        console.log("success");
        setIsLogged(true);
        handleModalText(`Welcome ${userName}!`);
        setUserName("");
      })
      .catch((error) => {
        console.log("An error ocurred: " + error.message);
        setIsLogged(false);
        handleModalText(`Something went wrong!`);
        setUserName("");
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
        console.log("Logoutsuccesfull");
      })
      .catch((error) => {
        console.log("An error ocurred: " + error.message);
      });
  };

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
    token,
    isLogged,
    openAuth,
    openLogin,
    openSignup,
    loginUser,
    signupUser,
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
