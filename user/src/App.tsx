import "./App.css";
import { Routes, Route } from "react-router-dom";
import RootPage from "./pages/RootPage";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import QNA from "./pages/QNA";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<RootPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/qna" element={<QNA />} />
      </Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
