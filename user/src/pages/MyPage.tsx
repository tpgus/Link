import React from "react";
import { useAppDispatch } from "../hooks/redux-hook";
import { logout } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/home", { replace: true });
  };
  return <button onClick={logoutHandler}>๋ก๊ทธ์์</button>;
};

export default MyPage;
