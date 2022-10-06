import { Routes, Route } from "react-router-dom";
import RootPage from "./pages/RootPage";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import QNA from "./pages/QNA";
import Auth from "./pages/Auth";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import FindId from "./components/auth/FindId";
import FindPassword from "./components/auth/FindPassword";
import VerificationEmail from "./pages/VerificationEmail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<RootPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/qna" element={<QNA />} />
      </Route>
      <Route path="/member" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="findId" element={<FindId />} />
        <Route path="findPassword" element={<FindPassword />} />
      </Route>
      <Route path="/verification/email" element={<VerificationEmail />} />
    </Routes>
  );
}

export default App;
