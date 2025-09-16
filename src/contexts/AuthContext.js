import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../config/api';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [initialLoading, setInitialLoading] = useState(true); 
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_info");
    setUser(null);
    navigate("/admin/login");
  }, [navigate]);


  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('user_token');
      if (!token) {
        setInitialLoading(false);
        return;
      }

    
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        const { data } = await api.get('/api/auth/me'); 
        setUser(data);
        localStorage.setItem('user_info', JSON.stringify(data));
      } catch (error) {
        console.error('Sessão inválida ou expirada. Fazendo logout.', error);
    
        logout();
      } finally {
        setInitialLoading(false);
      }
    };

    loadUserFromToken();
  }, [logout]);


  // Função de login - REMOVIDO setLoading daqui
  const login = useCallback(async (email, password) => {
    try {
      const { data } = await api.post("/api/auth/login", { email, password });

      const token = data.token || data.accessToken || data.jwt;
      if (!token) {
    
        throw new Error("Token de autenticação não foi recebido do servidor.");
      }

      localStorage.setItem("user_token", token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      const userInfo = data.user || {
          nome: data.nome,
          email: data.email,
          id: data._id || data.id,
          role: data.role,
      };

      setUser(userInfo);
      localStorage.setItem("user_info", JSON.stringify(userInfo));

      return { success: true, user: userInfo };

    } catch (error) {
      console.error("Falha no processo de login:", error);
      const backendMessage = error.response?.data?.message || error.message || "E-mail ou senha inválidos.";
      return { success: false, error: backendMessage };
    }
  }, []);


  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      const token = localStorage.getItem('user_token');
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => Promise.reject(error));

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, []);


  const authValue = {
    user,
    loading: initialLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {initialLoading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;

};
