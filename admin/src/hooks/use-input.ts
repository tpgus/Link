import { useState } from "react";

export const useInput = <T extends Function>(validateFunc: T) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  /*
  isTouched : 해당 input 요소에 한 번이라도 접근을 했는지에 대한 상태
  isTouched라는 상태는 사용자의 입력값에 대한 유효 여부를 실시간으로 피드백을 주기 위해 필요한 상태이다.
  이번 프로젝트에서는 실시간 피드백이 아닌 "로그인" 버튼을 눌렀을 때에만 유효성 검사를 수행하므로 사실 isTouched라는 상태는 없어도 무방하다.
  나중에 더 정교한 유효성 검사를 위해 추가했다.
  */

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsTouched(true);
  };

  const validateValue = () => {
    return isTouched && validateFunc(value);
  };

  const resetInputState = () => {
    setValue("");
    setIsTouched(false);
  };

  return { value, inputHandler, validateValue, resetInputState };
};
