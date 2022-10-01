import kakaoBtn from "../../assets/kakao_login_medium.png";
import { LoginContainer, LoginForm, SocialLogin } from "./css/style-Login";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authAPI } from "../../apis/api/auth";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/use-http";
import { useInput } from "../../hooks/use-input";

const validateId = (value: string) =>
  value.trim().length > 0 && value.includes("@");
const validatePassword = (value: string) => value.trim().length > 5;

interface ResponseType {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const [formIsInValid, setFormIsInvalid] = useState(false);
  const id = useInput(validateId);
  const password = useInput(validatePassword);
  const {
    sendRequest: signInRequest,
    data,
    status,
    error,
  } = useHttp<ResponseType>(authAPI.signIn);

  useEffect(() => {
    // 에러 메시지가 표시된 이후, 사용자가 다시 입력할 때 에러 메시지 숨기기
    if (formIsInValid && id.isTouched && password.isTouched) {
      setFormIsInvalid(false);
    }
  }, [formIsInValid, id.isTouched, password.isTouched]);

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id.validateValue() && password.validateValue()) {
      signInRequest({ email: id.value, password: password.value });
      id.resetValue();
    } else {
      setFormIsInvalid(true);
    }
    password.resetValue();
  };

  const socialLoginHandler = (type: string) => {
    alert(`${type} 로그인 클릭`);
  };

  if (data && !error && status === "completed") {
    navigate("/home", { replace: true });
  }

  if (error && status === "completed") {
    console.log(error);
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={loginHandler}>
        <input
          onChange={id.inputHandler}
          value={id.value}
          type="email"
          placeholder="아이디를 입력하세요 example@google.com"
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
        <ul>
          <li>
            <Link to={"/member/findId"}>아이디 찾기</Link>
          </li>
          <li>
            <Link to={"/member/findPassword"}>비밀번호 찾기</Link>
          </li>
        </ul>
      </div>
      <SocialLogin>
        <span>SNS 계정으로 로그인</span>
        <button className="kakoBtn" onClick={() => socialLoginHandler("kakao")}>
          <img src={kakaoBtn} alt="kakao-btn" />
        </button>
      </SocialLogin>
      <div className="signup-wrapper">
        아직 회원이 아니신가요? <Link to="/member/signup">회원가입</Link>
      </div>
    </LoginContainer>
  );
};

export default Login;
