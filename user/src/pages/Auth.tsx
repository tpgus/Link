import logo from "../assets/logo.png";
import { AuthContainer, Logo } from "./css/style-Auth";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <AuthContainer>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <Outlet />
    </AuthContainer>
  );
};

export default Auth;
