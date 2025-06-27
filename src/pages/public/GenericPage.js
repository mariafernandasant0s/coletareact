// src/pages/public/GenericPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../config/api';

function GenericPage({ slug }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // ✅ Novo estado para controlar o erro

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setError(false); // Reseta o erro a cada nova busca
      try {
        const { data } = await api.get(`/api/paginas/slug/${slug}`);
        if (data) {
          setPageData(data);
        } else {
          // A API retornou sucesso, mas sem dados
          setError(true);
        }
      } catch (err) {
        console.error(`Erro ao buscar a página ${slug}:`, err);
        setError(true); // Define que houve um erro na busca
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  // ✅ Lógica de renderização mais segura
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Carregando...</div>;
  }
  
  // Se deu erro ou se a página não foi encontrada, mostra uma mensagem segura
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

  // Só renderiza o conteúdo principal se tudo estiver OK
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
