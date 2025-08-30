import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../config/api';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner'; // Mantenha para o carregamento inicial

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Este 'loading' é APENAS para a verificação inicial do token ao carregar a app.
  const [initialLoading, setInitialLoading] = useState(true); 
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_info");
    setUser(null);
    navigate("/admin/login");
  }, [navigate]);

  // Carrega o usuário a partir do token no início da aplicação
  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('user_token');
      if (!token) {
        setInitialLoading(false);
        return;
      }

      // Adiciona o token para a próxima requisição
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        const { data } = await api.get('/api/auth/me'); // Endpoint para validar o token e obter dados do user
        setUser(data);
        localStorage.setItem('user_info', JSON.stringify(data));
      } catch (error) {
        console.error('Sessão inválida ou expirada. Fazendo logout.', error);
        // Se o token for inválido, limpa tudo
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
        // Se o backend não enviar token, é uma falha.
        throw new Error("Token de autenticação não foi recebido do servidor.");
      }

      localStorage.setItem("user_token", token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Atualiza o header para requisições futuras na mesma sessão

      // O ideal é buscar os dados do usuário em um endpoint seguro após o login
      // mas se o backend já os retorna, podemos usá-los.
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
    // O bloco 'finally' com setLoading foi removido daqui.
  }, []);

  // O interceptor não é estritamente necessário se usarmos `api.defaults.headers`
  // mas é uma abordagem robusta. Vou mantê-lo para garantir.
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
    loading: initialLoading, // Exponha o loading inicial se precisar
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