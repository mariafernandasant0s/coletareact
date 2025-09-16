import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiPublic = axios.create({
  baseURL: API_BASE_URL,
} );

const apiPrivate = axios.create({
  baseURL: API_BASE_URL,
});

apiPrivate.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('user_info');
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


export const putWithUpload = (url, formData) => {

  return apiPrivate.put(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default apiPrivate;

