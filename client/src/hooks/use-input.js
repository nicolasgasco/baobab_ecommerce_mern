import { useState } from "react";

const useInput = () => {
  const [enteredValue, setEnteredValue] = useState("");

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  return {
    value: enteredValue,
    valueChangeHandler,
    setEnteredValue,
  };
};

export default useInput;
