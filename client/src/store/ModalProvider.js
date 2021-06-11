import { useState } from "react";
import ModalContext from "./modal-context";

const ModalProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleModalText = (text) => {
    setModalText(text);
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };

  const modalContext = { isOpen, modalText, handleModalText, toggleModal };

  return (
    <ModalContext.Provider value={modalContext}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
