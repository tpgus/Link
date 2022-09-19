import "./App.css";
import { Routes, Route } from "react-router-dom";
import RootPage from "./pages/root/RootPage";
import Login from "./pages/login/Login";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Layout />} />
    </Routes>
  );
}

export default App;
