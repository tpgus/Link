import axios from "axios";
import { useState, useCallback } from "react";

type StatusType = "ready" | "loading" | "completed";

interface ErrorType {
  error: string;
}

export const useHttp = <T>(requestFunction: Function) => {
  const [data, setData] = useState<T[] | T>([]);
  const [error, setError] = useState<null | string>(null);
  const [status, setStatus] = useState<StatusType>("ready");

  const sendRequest = useCallback(
    async <A>(params: A) => {
      setStatus("loading");
      try {
        const responseData = await requestFunction(params);
        setData(responseData);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          //네트워크 요청에 관련한 에러
          setError((error.response.data as ErrorType).error);
        } else {
          //내가 의도적으로 발생시킬 수 있는 에러 : auth api 등 어딘가에서 throw new Error('에러')를 발생시키면 여기로 진입.
          setError((error as Error).message);
        }
      } finally {
        setStatus("completed");
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    data,
    error,
    status,
  };
};
