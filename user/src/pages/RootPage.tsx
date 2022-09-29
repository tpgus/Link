import { Navigate } from "react-router-dom";

const RootPage = () => {
  //페이지 접속시 바로 /home 경로로 리다이렉트하여 앱의 첫 화면의 경로가 /가 아닌 /home으로 표시된다
  return <Navigate to="/home" replace={true} />;
};

export default RootPage;
