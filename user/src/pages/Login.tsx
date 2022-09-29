import logo from "../assets/logo.png";
import kakaoBtn from "../assets/kakao_login_medium.png";
import { useState, useEffect } from "react";
import { useInput } from "../hooks/use-input";
import {
  LoginContainer,
  LoginForm,
  Logo,
  SocialLogin,
} from "./css/style-Login";
import { Link, useNavigate } from "react-router-dom";

const validateId = (value: string) =>
  value.trim().length > 0 && value.includes("@");
const validatePassword = (value: string) => value.trim().length > 0;

const Login = () => {
  const navigate = useNavigate();
  const [formIsInValid, setFormIsInvalid] = useState(false);
  const id = useInput(validateId);
  const password = useInput(validatePassword);

  useEffect(() => {
    // 에러 메시지가 표시된 이후, 사용자가 다시 입력할 때 에러 메시지 숨기기
    if (formIsInValid && (id.isTouched || password.isTouched)) {
      setFormIsInvalid(false);
    }
  }, [formIsInValid, id.isTouched, password.isTouched]);

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id.validateValue() && password.validateValue()) {
      navigate("/admin", { replace: true });
    } else {
      setFormIsInvalid(true);
    }
    id.resetValue();
    password.resetValue();
    testFunc();
  };

  const socialLoginHandler = (type: string) => {
    alert(`${type} 로그인 클릭`);
  };

  const testFunc = () => {
    alert("카카오 로그인을 이용해 주세요");
  };

  return (
    <LoginContainer>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <LoginForm onSubmit={loginHandler}>
        <input
          onChange={id.inputHandler}
          value={id.value}
          type="text"
          placeholder="아이디를 입력하세요"
        />
        <input
          onChange={password.inputHandler}
          value={password.value}
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        <p className={formIsInValid ? "active" : ""}>
          아이디와 비밀번호를 확인해 주세요
        </p>
        <button type="submit">로그인</button>
      </LoginForm>
      <div className="find-info">
        <ul onClick={testFunc}>
          <li>
            {/* <Link to="/signup">회원가입</Link> */}
            회원가입
          </li>
          <li>
            {/* <Link to="/find-id">아이디 찾기</Link> */}
            아이디 찾기
          </li>
          <li>
            {/* <Link to="/find-password">비밀번호 찾기</Link> */}
            비밀번호 찾기
          </li>
        </ul>
      </div>
      <SocialLogin>
        <span>SNS 계정으로 로그인</span>
        <button className="kakoBtn" onClick={() => socialLoginHandler("kakao")}>
          <img src={kakaoBtn} alt="kakao-btn" />
        </button>
      </SocialLogin>
    </LoginContainer>
  );
};

export default Login;
