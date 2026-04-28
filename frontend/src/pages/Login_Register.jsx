import React, { useState } from 'react';
import "../styles/Login_Register.css";
import { useNavigate } from "react-router-dom";
import accountService from "../api/accountService";

function Login({ onSwitch }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            // Gửi request LOGIN đến backend
            const response = await accountService.login(formData);
            
            // Lưu thông tin user vào localStorage để các trang khác có thể dùng
            localStorage.setItem("user", JSON.stringify(response.data));
            
            alert("Đăng nhập thành công!");
            navigate("/UserPage");
        } catch (error) {
            alert(error.response?.data || "Đăng nhập thất bại. Vui lòng kiểm tra lại!");
        }
    };

    return (
        <form className="login-container" onSubmit={handleSubmit}>
            <article className="login-form">
                <header>
                    <h1>Login</h1>
                </header>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
                <p>Don't have an account?</p>
                <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Register</a>
            </article>

            <aside className="welcome-message-login">
                <h1>WELCOME BACK!</h1>
                <p>We are happy to have you with us again. If you need anything, we are here to help.</p>
            </aside>
        </form>
    );
}

function Register({ onSwitch }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi request REGISTER đến backend
            await accountService.register(formData);
            alert("Đăng ký thành công! Mời bạn đăng nhập.");
            onSwitch(); // Chuyển về màn hình Login
        } catch (error) {
            alert(error.response?.data || "Đăng ký thất bại. Email có thể đã tồn tại.");
        }
    };

    return (
        <form className="register-container" onSubmit={handleSubmit}>
            <article className="register-form">
                <header>
                    <h1>Register</h1>
                </header>

                <select 
                    name="country" 
                    className="country" 
                    value={formData.country} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Chọn quốc gia</option>
                    <option value="VietNam">Việt Nam</option>
                    <option value="USA">Hoa Kỳ</option>
                    <option value="UK">Vương quốc Anh</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Úc</option>
                </select>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
                <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Login</a>
            </article>

            <aside className="welcome-message-register">
                <h1>WELCOME!</h1>
            </aside>
        </form>
    );
}

export default function Login_Register() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="login-register-container">
            {isLogin ? (
                <Login onSwitch={() => setIsLogin(false)} />
            ) : (
                <Register onSwitch={() => setIsLogin(true)} />
            )}
        </div>
    );
}