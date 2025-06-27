// src/pages/public/GenericPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { apiPublic } from '../../config/api';

function GenericPage({ slug }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const { data } = await apiPublic.get(`/api/paginas/slug/${slug}`);
        setPageData(data);
      } catch (error) {
        console.error(`Erro ao buscar a página ${slug}:`, error);
        setPageData(null); // Define como nulo em caso de erro
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Carregando...</div>;
  }
  
  if (!pageData) {
    return (
      <section className="info-section" style={{ textAlign: 'center' }}>
        <h2>Página não encontrada</h2>
        <p>O conteúdo que você está procurando não pôde ser carregado.</p>
      </section>
    );
  }

  return (
    <>
      {/* ✅ O HELMET FOI MOVIDO PARA CÁ */}
      <Helmet>
        <title>{pageData.titulo} - Coleta Seletiva</title>
      </Helmet>
      <section className="info-section">
        <div className="container">
          <h2>{pageData.titulo}</h2> 
          <div dangerouslySetInnerHTML={{ __html: pageData.conteudo }} />
          {/* ... resto do seu JSX ... */}
        </div>
      </section>
    </>
  );
}
export default GenericPage;
