import React from "react";
import ReactDOM from "react-dom";

// Tailwind-generated css
import "./assets/main.css";

import App from "./App";

import AuthProvider from "./store/AuthProvider";
import ModalProvider from "./store/ModalProvider";
import CartProvider from "./store/CartProvider";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
