import React, { useState } from "react";

interface ReturnType {
  isValid: boolean;
  errorMessage: string | null;
}
type ValidateFunc = (value: string) => ReturnType;

export const useInput = (validateFunc: ValidateFunc) => {
  const [value, setValue] = useState("");
  const [inputElementisTouched, setInputElementIsTouched] = useState(false);
  const { isValid, errorMessage } = validateFunc(value);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setInputElementIsTouched(true);
  };

  const resetValue = () => {
    setValue("");
  };

  const resetTouched = () => {
    setInputElementIsTouched(false);
  };

  return {
    value,
    inputElementisTouched,
    isValid,
    errorMessage,
    inputHandler,
    resetValue,
    resetTouched,
  };
};
