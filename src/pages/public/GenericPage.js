// src/pages/public/GenericPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../config/api';

function GenericPage({ slug }) {
  // ✅ CORREÇÃO: Adicionando os 'states' que estavam faltando
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ CORREÇÃO: Adicionando o 'useEffect' para buscar os dados da API
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/paginas/${slug}`);
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
    return <div style={{ textAlign: 'center', padding: '40px' }}>Página não encontrada ou erro ao carregar.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{pageData.titulo} - Coleta Seletiva</title>
      </Helmet>
      <section className="info-section">
        <div className="container">
          <h2>{pageData.titulo}</h2> 
          <div dangerouslySetInnerHTML={{ __html: pageData.conteudo }} />
          {pageData.midiaUrl && (
            pageData.midiaUrl.includes('youtube.com') ? (
              <iframe
                className="youtube-video"
                src={pageData.midiaUrl}
                title={pageData.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img src={`${process.env.REACT_APP_API_URL}${pageData.midiaUrl}`} alt={pageData.titulo} />
            )
          )}
        </div>
      </section>
    </>
  );
}

export default GenericPage;
