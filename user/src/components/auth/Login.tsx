import kakaoBtn from "../../assets/kakao_login_medium.png";
import { loginValidate } from "../../utils/validator";
import { useAppDispatch } from "../../hooks/redux-hook";
import { login } from "../../store/auth-slice";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../apis/api/auth";
import { useHttp } from "../../hooks/use-http";
import { useInput } from "../../hooks/use-input";
import { Container as LoginContainer, Button } from "../style/styled";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  LoginForm,
  SocialLogin,
  FindInformation,
  SignupWrapper,
} from "./css/style-Login";

interface SignupResponseType {
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
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginFetch = useHttp<SignupResponseType>(authAPI.signIn);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    // http 요청 성공에 따른 동작
    // 아래의 로직을 기존에는 컴포넌트 최상단 스코프에서 바로 써주었지만,
    // 그럴 경우 Login 컴포넌트가 모두 렌더링 되기 전에 navigate에 의해 이동되므로 에러가 발생한다.
    if (
      loginFetch.data &&
      !loginFetch.error &&
      loginFetch.status === "completed"
    ) {
      dispatch(login());
      navigate("/home", { replace: true });
    }
  }, [
    loginFetch.data,
    loginFetch.error,
    loginFetch.status,
    navigate,
    dispatch,
  ]);

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const { isValid: idIsValid, errorMessage: idErrorMessage } =
      id.validateValue(idRef.current!.value);
    const { isValid: passwordIsValid, errorMessage: passwordErrorMessage } =
      password.validateValue(passwordRef.current!.value);

    event.preventDefault();
    if (idIsValid && passwordIsValid) {
      loginFetch.sendRequest({
        email: idRef.current!.value,
        password: passwordRef.current!.value,
      });
    } else {
      setInputError(idErrorMessage || passwordErrorMessage);
      setFormIsInvalid(true);
    }
    // id.resetValue();
    passwordRef.current!.value = "";
    password.focusHandler(false);
  };

  const socialLoginHandler = (type: string) => {
    alert(`${type} 로그인 클릭`);
  };

  // http 요청 실패에 따른 동작
  if (loginFetch.error && loginFetch.status === "completed") {
    const errorMessgae = getErrorMessage.signIn(loginFetch.error);
    setInputError(errorMessgae);
    setFormIsInvalid(true);
    loginFetch.reset();
  }
  // 상단의 http 요청 성공에 따른 동작 (useEffect 사용)과 비교하기
  // 만약 요청 성공에 따른 동작들이 아래와 같이 Login 컴포넌트 자체에 재렌더링을 발생시킬 수 있는 동작이라면
  // 위와 같이 사용해도 된다. 하지만, 요청 성공에 따른 동작은 Login 컴포넌트가 모두 렌더링되기 전에(중에) (navigate로 이동)
  // 발생 하므로 에러 발생

  return (
    <LoginContainer>
      <LoginForm onSubmit={loginHandler}>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          ref={idRef}
          onFocus={() => id.focusHandler(true)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          ref={passwordRef}
          onFocus={() => password.focusHandler(true)}
        />
        <p className={formIsInValid ? "active" : ""}>
          {inputError || "아이디 또는 비밀번호를 확인해 주세요"}
        </p>
        <Button btnHeight="2.5rem" type="submit">
          로그인
        </Button>
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
