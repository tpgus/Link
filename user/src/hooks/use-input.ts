import React, { useState } from "react";

export const useInput = <T extends Function>(validateFunc: T) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsTouched(true);
  };

  const validateValue = () => {
    return isTouched && validateFunc(value);
  };

  const resetValue = () => {
    setValue("");
    setIsTouched(false);
  };

  return { value, isTouched, inputHandler, validateValue, resetValue };
};
