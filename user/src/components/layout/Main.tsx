import { Outlet } from "react-router-dom";
import { MainConatiner } from "./css/style-Main";

const Main = () => {
  return (
    <MainConatiner>
      <Outlet />
    </MainConatiner>
  );
};

export default Main;
