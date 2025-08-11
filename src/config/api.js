import axios from 'axios';

// Instância para chamadas PÚBLICAS (nunca envia token)
export const apiPublic = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Instância para chamadas PRIVADAS (sempre envia token se existir)
export const apiPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor para adicionar o token no header Authorization na instância privada
apiPrivate.interceptors.request.use(config => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const token = JSON.parse(userInfo).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Exporta a instância privada como padrão para não quebrar os arquivos admin
export default apiPrivate;
