// src/pages/public/GenericPage.js

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// ✅ MUDANÇA IMPORTANTE: Importa a apiPublic, que não envia token.
import { apiPublic } from '../../config/api';

function GenericPage({ slug }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setError(false);
      try {
        // ✅ USA A API PÚBLICA (apiPublic) para a chamada.
        const { data } = await apiPublic.get(`/api/paginas/slug/${slug}`);
        if (data) {
          setPageData(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(`Erro ao buscar a página ${slug}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Carregando...</div>;
  }
  
  if (error || !pageData) {
    return (
        <section className="info-section">
            <div className="container" style={{ textAlign: 'center' }}>
                <h2>Oops! Algo deu errado.</h2>
                <p>Não foi possível carregar o conteúdo desta página. Tente atualizar a página ou volte mais tarde.</p>
            </div>
        </section>
    );
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
