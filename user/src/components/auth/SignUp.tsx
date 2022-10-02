import React from "react";
import {
  Container as SignupContainer,
  Button,
} from "../../components/style/common";
import { SignupForm } from "./css/style-Signup";

const SignUp = () => {
  const signUpHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <SignupContainer>
      <SignupForm onSubmit={signUpHandler}>
        <h3>회원가입</h3>
        <label htmlFor="email">
          아이디 <span>필수 입력</span>
        </label>
        <input id="email" type="email" placeholder="example@google.com" />
        <label htmlFor="password">
          비밀번호<span>필수 입력</span>
        </label>
        <input type="password" placeholder="숫자, 영문 조합 최소 8자" />
        <input type="password" placeholder="비밀번호 확인" />
        <Button type="submit">가입하기</Button>
      </SignupForm>
    </SignupContainer>
  );
};

export default SignUp;
