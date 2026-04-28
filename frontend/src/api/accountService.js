import axios from 'axios';

const API = "http://localhost:5187/api"; 

const accountService = {
    login: (data) => axios.post(`${API}/auth/login`, data),
    register: (data) => axios.post(`${API}/auth/register`, data),
    getAccounts: () => axios.get(`${API}/account`),
    createAccount: (data) => axios.post(`${API}/account`, data),
    deleteAccount: (id) => axios.delete(`${API}/account/${id}`),
};

// Dòng này là quan trọng nhất để fix lỗi trắng trang
export default accountService;