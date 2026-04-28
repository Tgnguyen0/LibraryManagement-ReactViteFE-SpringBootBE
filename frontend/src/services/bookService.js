import axios from "axios";

const BASE = "http://localhost:9000/api";
const API  = `${BASE}/books`;

// Tự động gắn token vào mọi request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tự động xử lý lỗi 401 — hết hạn token thì về trang login
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (data) => axios.post(`${BASE}/auth/login`, data);
export const getBooks = () => axios.get(API);
export const getBook = (id) => axios.get(`${API}/${id}`);
export const createBook = (data) => axios.post(API, data);
export const updateBook = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${API}/${id}`);
export const searchBook = (keyword) =>
  axios.get(`${API}/search?keyword=${keyword}`);