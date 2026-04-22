import axios from "axios";

const API = "http://localhost:9000/api/books";

export const getBooks = () => axios.get(API);
export const getBook = (id) => axios.get(`${API}/${id}`);
export const createBook = (data) => axios.post(API, data);
export const updateBook = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${API}/${id}`);
export const searchBook = (keyword) =>
  axios.get(`${API}/search?keyword=${keyword}`);