import axios from 'axios';

// URL pública do backend para produção
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Instância para chamadas PÚBLICAS (nunca envia token )
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

/**
 * Função específica para requisições PUT com FormData (upload de arquivos).
 * Usa o axios diretamente para garantir controle total sobre os headers.
 * @param {string} url - A URL do endpoint da API (ex: '/api/paginas/123').
 * @param {FormData} formData - O objeto FormData contendo os dados e o arquivo.
 * @returns {Promise} - A promessa da requisição Axios.
 */
export const putWithUpload = (url, formData) => {
  const userInfo = localStorage.getItem('user_info');
  let token = null;
  if (userInfo) {
    token = JSON.parse(userInfo).token;
  }

  // Usamos axios.put diretamente para não passar pelos interceptors que podem
  // interferir com o Content-Type de multipart/form-data.
  return axios.put(`${API_BASE_URL}${url}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};


// Exporta a instância privada como padrão para não quebrar os arquivos admin
export default apiPrivate;
