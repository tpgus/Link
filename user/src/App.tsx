import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import QNA from "./pages/QNA";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/qna" element={<QNA />} />
      </Route>
    </Routes>
  );
}

export default App;
