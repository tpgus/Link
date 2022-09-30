import logo from "../../assets/logo.png";
import uuid from "react-uuid";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { HeaderContainer, Logo, NavMenu } from "./css/style-Header";

const menus = [
  {
    name: "문의하기",
    path: "/qna",
  },
  {
    name: "로그인",
    path: "/member/login",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const isLogin = false;

  return (
    <HeaderContainer>
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
        </ul>
      </NavMenu>
    </HeaderContainer>
  );
};

export default Header;
