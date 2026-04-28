import React from "react"; // Nên thêm dòng này
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Kiểm tra kỹ đường dẫn file
import HomePage from "./pages/HomePage";
import Login_Register from "./pages/Login_Register";
import UserPage from "./pages/UserPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage />} /> 
        {/* Trang đăng nhập */}
        <Route path="/Login_Register" element={<Login_Register />} />
        {/* Trang cá nhân - Sau khi đăng nhập sẽ navigate về đây */}
        <Route path="/UserPage" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);