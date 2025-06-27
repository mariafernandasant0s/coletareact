// src/pages/public/GenericPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { apiPublic } from '../../config/api';

function GenericPage({ slug }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  // ...outros states...

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const { data } = await apiPublic.get(`/api/paginas/slug/${slug}`);
        setPageData(data);
      } catch (error) {
        console.error(`Erro ao buscar a página ${slug}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  // O resto do seu JSX continua aqui, sem alterações...
  if (loading) return <p>Carregando...</p>;
  if (!pageData) return <p>Página não encontrada.</p>;
  return (
    // Seu JSX para renderizar a página
    // ...
  );
}
export default GenericPage;
