import logo from "../../assets/logo.png";
import uuid from "react-uuid";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { HeaderContainer, Logo, NavMenu } from "./css/style-Header";
import Login from "../login/Login";

const menus = [
  {
    name: "문의하기",
    path: "/qna",
  },
];

const Header = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = false;

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <HeaderContainer>
      {loginModalOpen && <Login onClose={closeLoginModal} />}
      <Logo onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </Logo>
      <NavMenu>
        <ul>
          {menus.map((menu) => (
            <li key={uuid()}>
              <NavLink
                to={menu.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {menu.name}
              </NavLink>
            </li>
          ))}
          {!isLogin && <li onClick={openLoginModal}>로그인</li>}
        </ul>
      </NavMenu>
    </HeaderContainer>
  );
};

export default Header;
