import logo from "../../assets/logo.png";
import { useState } from "react";
import { Container, Logo, LoginForm } from "./css/style-Login";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../hooks/use-input";

const validateId = (value: string) =>
  value.trim().length > 0 && value.includes("@");
const validatePassword = (value: string) => value.trim().length > 0;

const Login = () => {
  const navigate = useNavigate();
  const [formIsInValid, setFormIsInvalid] = useState(false);
  const id = useInput(validateId);
  const password = useInput(validatePassword);

  const loginHandler = () => {
    if (id.validateValue() && password.validateValue()) {
      navigate("/admin", { replace: true });
    } else {
      setFormIsInvalid(true);
    }
    id.resetInputState();
    password.resetInputState();
  };

  return (
    <Container>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <LoginForm>
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
      </LoginForm>
      <button onClick={loginHandler}>로그인</button>
      <p>아직 회원이 아니신가요?</p>
    </Container>
  );
};

export default Login;
