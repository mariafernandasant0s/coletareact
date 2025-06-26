import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../config/api';

function GenericPage({ slug }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/paginas/${slug}`);
        setPageData(response.data);
      } catch (error) {
        console.error(`Erro ao buscar dados da página ${slug}:`, error);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [slug]);

  if (loading) {
    return (
      <main className="loading-container">
        <p>Carregando conteúdo...</p>
      </main>
    );
  }

  if (!pageData) {
    return (
      <main className="error-container">
        <p>Não foi possível carregar o conteúdo desta página.</p>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageData.titulo} - Coleta Seletiva</title>
      </Helmet>
      <main>
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
      </main>
    </>
  );
}

export default GenericPage;