// src/config/api.js

import axios from 'axios';

// Instância base sem interceptor para chamadas públicas
const apiPublic = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Instância separada que SEMPRE adiciona o token para chamadas privadas
const apiPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiPrivate.interceptors.request.use(config => {
  const token = localStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { apiPublic, apiPrivate };

// Mantém uma exportação padrão para compatibilidade, mas usaremos as específicas
export default apiPrivate; 
