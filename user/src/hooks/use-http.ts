import axios from "axios";
import { useState, useCallback } from "react";

type StatusType = "ready" | "loading" | "completed";

interface ErrorType {
  error: {
    message: string;
  };
}

type RequestFunctionType<T> = (value?: any) => Promise<T>;
//requestFunction은 실제 API 요청 로직을 담고 있는 함수 : apis/api 경로 참조
//requestFunction 함수 타입을 정의하는 시점에서는 매개변수 'value'는 어떠한 타입도 올 수 있다. (이때에는 어떤 타입이 전달될 지 모름)
//중요한 점은 이 함수가 Promise 객체를 반환한다는 것.
//실제 api를 요청하는 시점에서 requestFunction에 전달되는 매개변수의 타입이 정해진다. (24행 및 27행)

export const useHttp = <T>(requestFunction: RequestFunctionType<T>) => {
  const [data, setData] = useState<T | T[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [status, setStatus] = useState<StatusType>("ready");

  const sendRequest = useCallback(
    async <A>(params?: A) => {
      setStatus("loading");
      try {
        const responseData = await requestFunction(params);
        setData(responseData);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          //네트워크 요청에 관련한 에러
          //과연 axios 요청에 대한 에러가 모두 이 형식일까?
          setError((error.response.data as ErrorType).error.message);
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

  const reset = () => {
    setData([]);
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
