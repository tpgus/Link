import { useEffect, useState, useRef } from "react";
import { signUp } from "../../lib/firebase";
import crypto from "crypto-js";
import { Container as SignupContainer, Button } from "../style/styled";
import { SignupWrapper, IdWrapper, PasswordWrapper } from "./css/style-Signup";
import { signUpValidate } from "../../utils/validator";
import { useInput } from "../../hooks/use-input";
import { authAPI } from "../../apis/api/auth";
import { useHttp } from "../../hooks/use-http";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useAppSelector } from "../../hooks/redux-hook";
import { auth } from "../../lib/firebase";
import { useSearchParams } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { intervalId } from "../../lib/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
} from "firebase/auth";

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
  const confirmPassword = useInput(signUpValidate.password);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [emailVerificationMessage, setEmailVerificationMessage] = useState({
    type: "",
    message: "",
  });
  const verifyEmailFetch = useHttp<{ email: string }>(authAPI.verifyEmail);
  const fakeSignup = useHttp(signUp);

  const [time, setTime] = useState(3);
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const continueUrl = searchParams.get("continueUrl");
  const oobCode = searchParams.get("oobCode");
  const [flag, setFlag] = useState(false);

  const signUpHandler = () => {
    console.log("가입하기 클릭");
    //인증 버튼을 눌렀는지 확인하고
    //삭제해야 하는 경우, 인증 버튼을 누르고, 가입하기 버튼을 누르지 않고 페이지를 벗어나는 경우
    //가입하기를 눌렀을 경우 -> 패스워드 변경? 아니면 삭제 후 가입?
  };

  useEffect(() => {
    if (flag) {
      const intervalId = setInterval(() => {
        auth.currentUser?.reload();
        if (auth.currentUser?.emailVerified) {
          console.log("인증 되었습니다.");
          clearInterval(intervalId);
        } else {
          console.log("인증되지 않았습니다.");
        }
      }, 3000);
    }
  }, [flag]);

  const verifyEmail = () => {
    const { isValid: idIsValid, errorMessage: idErrorMessage } =
      id.validateValue(idRef.current!.value);
    if (!idIsValid) {
      setEmailVerificationMessage({
        type: "error",
        message: idErrorMessage!,
      });
      return;
    }
    //Math.random()보다 암호학적으로 안전한 난수를 생성한다.
    const array = new Uint32Array(1);
    const temporalPassword = window.crypto.getRandomValues(array)[0];
    const encryptedPassword = crypto.AES.encrypt(
      temporalPassword.toString(),
      `${process.env.REACT_APP_SECRET_KEY}`
    ).toString();
    fakeSignup.sendRequest({
      email: idRef.current!.value,
      password: encryptedPassword,
    });
  };

  const confrimPasswordHandler = () => {
    if (
      confirmPassword.inputElementisTouched &&
      confirmPasswordRef.current!.value.trim().length > 0
    ) {
      setIsSamePassword(
        signUpValidate.checkConfirmPassword(
          passwordRef.current!.value,
          confirmPasswordRef.current!.value
        )
      );
    }
  };

  //정상 요청
  if (!fakeSignup.error && fakeSignup.status === "completed") {
    //한 번 정상적인 요청이 수행되면, 다음 렌더링에서도 이 코드 블럭에 진입한다.
    //하지만 이때, 이 안에서 verifyEmailFetch 요청이 수행되어, 그 결과로 인해 재렌더링이 발생하고
    //재렌더링시 또 진입하고, 또 요청하고 또 진입한다. (재렌더링이 되어도 if 조건이 항상 참이기에)
    //그래서 재진입하지 않기 위해 reset을 호출하지만, 과연 reset을 호출하는 것이 맞나
    // verifyEmailFetch.sendRequest(test.data?.idToken);
    setEmailVerificationMessage({
      type: "normal",
      message: "인증 메일이 발송되었습니다. 이메일을 확인해 주세요",
    });
    setFlag(true);
    fakeSignup.reset();
  }

  //에러 발생
  if (fakeSignup.error && fakeSignup.status === "completed") {
    const errorMessage = getErrorMessage.signUp(fakeSignup.error);
    setEmailVerificationMessage({ type: "error", message: errorMessage });
    fakeSignup.reset();
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
              placeholder="example@google.com"
              ref={idRef}
              onFocus={() => id.focusHandler(true)}
            />
            <Button onClick={verifyEmail}>인증</Button>
          </form>
          <p
            className={
              emailVerificationMessage.type === "error" ? "error" : "normal"
            }
          >
            {emailVerificationMessage.message}
          </p>
        </IdWrapper>
        <PasswordWrapper>
          <label htmlFor="password">
            비밀번호<span>필수 입력</span>
          </label>
          <form className="password-form">
            <input
              type="password"
              placeholder="숫자, 영문 조합 최소 8자"
              ref={passwordRef}
              onFocus={() => password.focusHandler(true)}
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              ref={confirmPasswordRef}
              onChange={confrimPasswordHandler}
              onFocus={() => confirmPassword.focusHandler(true)}
            />
          </form>
          {!isSamePassword && confirmPassword.inputElementisTouched && (
            <p>비밀번호가 일치하지 않습니다.</p>
          )}
        </PasswordWrapper>
        <Button btnHeight="2.5rem" onClick={signUpHandler}>
          가입하기
        </Button>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default SignUp;
