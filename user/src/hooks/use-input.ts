import React, { useState } from "react";

interface ReturnType {
  isValid: boolean;
  errorMessage: string | null;
}
type ValidateFunc = (value: string) => ReturnType;

export const useInput = (validateFunc: ValidateFunc) => {
  const [value, setValue] = useState("");
  const [inputElementisTouched, setInputElementIsTouched] = useState(false);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setInputElementIsTouched(true);
  };

  const validateValue = (value: string) => {
    return validateFunc(value);
  };

  const resetValue = () => {
    setValue("");
  };

  const focusHandler = (state: boolean) => {
    setInputElementIsTouched(state);
  };

  return {
    value,
    inputElementisTouched,
    validateValue,
    inputHandler,
    resetValue,
    focusHandler,
  };
};
