import kakaoBtn from "../../assets/kakao_login_medium.png";
import { loginValidate } from "../../utils/validator";
import { Container as LoginContainer } from "../style/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../apis/api/auth";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/use-http";
import { useInput } from "../../hooks/use-input";
import {
  LoginForm,
  SocialLogin,
  FindInformation,
  SignupWrapper,
} from "./css/style-Login";

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
  const [inputError, setInputError] = useState<string | null>(null);
  const id = useInput(loginValidate.id);
  const password = useInput(loginValidate.password);
  const loginFetch = useHttp<ResponseType>(authAPI.signIn);

  useEffect(() => {
    // 에러 메시지가 표시된 이후, 사용자가 다시 입력할 때 에러 메시지 숨기기
    if (
      formIsInValid &&
      id.inputElementisTouched &&
      password.inputElementisTouched
    ) {
      setFormIsInvalid(false);
    }
  }, [formIsInValid, id.inputElementisTouched, password.inputElementisTouched]);

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id.isValid && password.isValid) {
      loginFetch.sendRequest({ email: id.value, password: password.value });
    } else {
      setInputError(id.errorMessage || password.errorMessage);
      setFormIsInvalid(true);
    }
    // id.resetValue();
    password.resetValue();
  };

  const socialLoginHandler = (type: string) => {
    alert(`${type} 로그인 클릭`);
  };

  // http 요청 성공에 따른 동작
  if (
    loginFetch.data &&
    !loginFetch.error &&
    loginFetch.status === "completed"
  ) {
    navigate("/home", { replace: true });
  }

  // http 요청 실패에 따른 동작
  if (loginFetch.error && loginFetch.status === "completed") {
    setFormIsInvalid(true);
    switch (loginFetch.error) {
      case "EMAIL_NOT_FOUND":
        console.log(id.value);
        setInputError("해당 아이디가 존재하지 않습니다");
        break;

      case "INVALID_EMAIL":
        setInputError("이메일 형식의 아이디를 입력해 주세요");
        break;

      case "INVALID_PASSWORD":
        setInputError("비밀번호가 틀렸습니다.");
        break;

      default:
        setInputError(
          `너무 많은 요청으로 인해 해당 계정으로 로그인을 할 수 없습니다.
          잠시 후에 다시 시도해 주세요`
        );
        break;
    }
    loginFetch.reset();
  }

  return (
    <LoginContainer>
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
          {inputError || "아이디와 비밀번호를 확인해 주세요"}
        </p>
        <button type="submit">로그인</button>
      </LoginForm>
      <FindInformation>
        <ul>
          <li>
            <Link to={"/member/findId"}>아이디 찾기</Link>
          </li>
          <li>
            <Link to={"/member/findPassword"}>비밀번호 찾기</Link>
          </li>
        </ul>
      </FindInformation>
      <SocialLogin>
        <span>SNS 계정으로 로그인</span>
        <button className="kakoBtn" onClick={() => socialLoginHandler("kakao")}>
          <img src={kakaoBtn} alt="kakao-btn" />
        </button>
      </SocialLogin>
      <SignupWrapper>
        아직 회원이 아니신가요? <Link to="/member/signup">회원가입</Link>
      </SignupWrapper>
    </LoginContainer>
  );
};

export default Login;
