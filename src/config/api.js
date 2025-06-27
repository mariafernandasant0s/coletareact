// src/api.js (ou onde você faz as chamadas API)
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Adiciona o token automaticamente nas requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tratamento de erros global
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redireciona para login se não autorizado
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
