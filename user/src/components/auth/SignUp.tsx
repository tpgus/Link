import React, { useEffect, useState } from "react";
import crypto from "crypto-js";
import { Container as SignupContainer, Button } from "../style/styled";
import { SignupWrapper, IdWrapper, PasswordWrapper } from "./css/style-Signup";
import { signUpValidate } from "../../utils/validator";
import { useInput } from "../../hooks/use-input";
import { authAPI } from "../../apis/api/auth";
import { useHttp } from "../../hooks/use-http";
import { getErrorMessage } from "../../utils/getErrorMessage";

interface SignupResponseType {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

const SignUp = () => {
  const id = useInput(signUpValidate.id);
  const password = useInput(signUpValidate.password);
  const passwordConfirm = useInput(signUpValidate.password);
  const [formIsValid, setFormIsValid] = useState(false);
  const fakeSignupFetch = useHttp<SignupResponseType>(authAPI.signUp);
  const verifyEmailFetch = useHttp<{ email: string }>(authAPI.verifyEmail);

  const signUpHandler = () => {
    console.log("가입하기 클릭");
  };

  const verifyEmail = () => {
    //Math.random()보다 암호학적으로 안전한 난수를 생성한다.
    const array = new Uint32Array(1);
    const temporalPassword = window.crypto.getRandomValues(array)[0];
    const encryptedPassword = crypto.AES.encrypt(
      temporalPassword.toString(),
      `${process.env.REACT_APP_SECRET_KEY}`
    ).toString();
    fakeSignupFetch.sendRequest({
      email: id.value,
      password: encryptedPassword,
    });
  };

  //정상 요청
  if (!fakeSignupFetch.error && fakeSignupFetch.status === "completed") {
    //한 번 정상적인 요청이 수행되면, 다음 렌더링에서도 이 코드 블럭에 진입한다.
    //하지만 이때, 이 안에서 verifyEmailFetch 요청이 수행되어, 그 결과로 인해 재렌더링이 발생하고
    //재렌더링시 또 진입하고, 또 요청하고 또 진입한다. (재렌더링이 되어도 if 조건이 항상 참이기에)
    //그래서 재진입하지 않기 위해 reset을 호출하지만, 과연 reset을 호출하는 것이 맞나
    verifyEmailFetch.sendRequest(fakeSignupFetch.data?.idToken);
    fakeSignupFetch.reset();
  }

  //에러 발생
  if (fakeSignupFetch.error && fakeSignupFetch.status === "completed") {
    fakeSignupFetch.reset();
  }

  //정상 요청
  if (!verifyEmailFetch.error && verifyEmailFetch.status === "completed") {
    console.log(verifyEmailFetch.data);
  }

  //에러 발생
  if (verifyEmailFetch.error && verifyEmailFetch.status === "completed") {
    verifyEmailFetch.reset();
  }

  return (
    <SignupContainer>
      <h3>회원가입</h3>
      <SignupWrapper>
        <IdWrapper>
          <label htmlFor="email">
            아이디 <span>필수 입력</span>
          </label>
          <form className="email-form" onSubmit={(e) => e.preventDefault()}>
            <input
              id="email"
              type="email"
              value={id.value}
              placeholder="example@google.com"
              onChange={id.inputHandler}
            />
            <Button onClick={verifyEmail}>인증</Button>
          </form>
          <p>{"인증 메일이 발송되었습니다. 이메일을 확인해 주세요"}</p>
        </IdWrapper>
        <PasswordWrapper>
          <label htmlFor="password">
            비밀번호<span>필수 입력</span>
          </label>
          <form className="password-form">
            <input
              type="password"
              placeholder="숫자, 영문 조합 최소 8자"
              onChange={password.inputHandler}
              value={password.value}
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              onChange={passwordConfirm.inputHandler}
              value={passwordConfirm.value}
            />
          </form>
        </PasswordWrapper>
        <Button bgHeight="2.5rem" onClick={signUpHandler}>
          가입하기
        </Button>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default SignUp;
