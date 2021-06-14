import { useState } from "react";
import ModalContext from "./modal-context";

const ModalProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalBody, setModalBody] = useState([]);

  const handleModalText = (title, body) => {
    setModalText(title.charAt(0).toUpperCase() + title.slice(1));
    if (body) {
      if (Array.isArray(body)) {
        setModalBody(
          body.map((error) => {
            return error.charAt(0).toUpperCase() + error.slice(1);
          })
        );
      } else {
        setModalBody([body.charAt(0).toUpperCase() + body.slice(1)]);
      }
    } else {
      setModalBody([]);
    }
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };

  const modalContext = {
    isOpen,
    modalText,
    modalBody,
    handleModalText,
    toggleModal,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
