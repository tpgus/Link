import { Navigate } from "react-router-dom";

const RootPage = () => {
  /*
  [RootPage 페이지의 목적]
  사이트 경로가 "/"가 아닌 "/admin/xxx"로 보여지기 위해 "/" 경로로 접속하게되면 바로 /admin/xxx로 리다이렉트 된다.
  */
  return <Navigate to="/admin/login" replace={true} />;
};

export default RootPage;
