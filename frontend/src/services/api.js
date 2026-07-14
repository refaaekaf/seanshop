import axios from 'axios';

const API = axios.create({
baseURL: 'https://seanshop-r39d.vercel.app/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const seedSampleProducts = () => API.post('/products/seed'); 

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const createOrder = (data) => API.post('/orders', data);