import React from "react";
import ReactDOM from "react-dom";

// Tailwind-generated css
import "./assets/main.css";

import App from "./App";

import AuthProvider from "./store/AuthProvider";
import ModalProvider from "./store/ModalProvider";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
