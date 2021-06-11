import React from "react";

const ModalContext = React.createContext({
  isOpen: false,
  modalText: "",
  handleModalText: () => {},
  toggleModal: () => {},
});

export default ModalContext;
