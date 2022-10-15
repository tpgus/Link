import axios from "axios";
import { useState, useCallback } from "react";

type StatusType = "ready" | "loading" | "completed";

interface ErrorType {
  code: string;
  message: string;
}

export const useHttp = <T>(requestFunction: Function) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [status, setStatus] = useState<StatusType>("ready");

  const sendRequest = useCallback(
    async <A>(params?: A) => {
      setStatus("loading");
      try {
        const responseData = await requestFunction(params);
        setData(responseData);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.message) {
          //네트워크 요청에 관련한 에러
          //과연 axios 요청에 대한 에러가 모두 이 형식일까?
          setError(error.message);
        } else {
          //내가 의도적으로 발생시킬 수 있는 에러 : auth api 등 어딘가에서 throw new Error('에러')를 발생시키면 여기로 진입.
          setError((error as ErrorType).code);
        }
      } finally {
        setStatus("completed");
      }
    },
    [requestFunction]
  );

  const reset = () => {
    setError(null);
    setStatus("ready");
  };

  return {
    sendRequest,
    reset,
    data,
    error,
    status,
  };
};
