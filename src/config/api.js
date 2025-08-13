import axios from 'axios';

// URL pública do backend para produção
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://coleta-back.onrender.com';

// Instância para chamadas PÚBLICAS (nunca envia token)
export const apiPublic = axios.create({
  baseURL: API_BASE_URL,
});

// Instância para chamadas PRIVADAS (sempre envia token se existir)
export const apiPrivate = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o token no header Authorization na instância privada
apiPrivate.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('user_info'); // ajuste para sua chave correta
    if (userInfo) {
      const token = JSON.parse(userInfo).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exporta a instância privada como padrão para não quebrar os arquivos admin
export default apiPrivate;


