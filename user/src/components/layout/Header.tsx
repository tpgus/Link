import logo from "../../assets/logo.png";
import uuid from "react-uuid";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { HeaderContainer, Logo, NavMenu } from "./css/style-Header";
import { useAppSelector } from "../../hooks/redux-hook";

const fixedMenus = [
  {
    name: "문의하기",
    path: "/qna",
  },
];

const Header = () => {
  const { isLogin } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(isLogin);

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </Logo>
      <NavMenu>
        <ul>
          {fixedMenus.map((menu) => (
            <li key={uuid()}>
              <NavLink
                to={menu.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {menu.name}
              </NavLink>
            </li>
          ))}
          {
            <li key={uuid()}>
              <NavLink to={isLogin ? "/mypage" : "/member/login"}>
                {isLogin ? "마이페이지" : "로그인"}
              </NavLink>
            </li>
          }
        </ul>
      </NavMenu>
    </HeaderContainer>
  );
};

export default Header;
