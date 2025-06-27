// src/pages/public/HomePage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { apiPublic } from '../../config/api';
// ... outros imports que você usa (FontAwesomeIcon, Lightbox, etc) ...

function HomePage() {
  const [heroData, setHeroData] = useState(null);
  const [cronogramaData, setCronogramaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [heroRes, cronogramaRes] = await Promise.all([
          apiPublic.get('/api/paginas/slug/home-hero'),
          apiPublic.get('/api/paginas/slug/home-cronograma'),
        ]);
        setHeroData(heroRes.data);
        setCronogramaData(cronogramaRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados da página inicial:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <main style={{ padding: '40px', textAlign: 'center' }}><p>Carregando...</p></main>;
  }

  if (!heroData || !cronogramaData) {
    return (
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Oops! Não foi possível carregar a página.</h2>
        <p>Houve um problema de comunicação com o servidor. Por favor, tente novamente mais tarde.</p>
      </main>
    );
  }

  return (
    <>
      {/* ✅ O HELMET FOI MOVIDO PARA CÁ */}
      <Helmet>
        <title>Início - Coleta Seletiva de Assis Chateaubriand</title>
        <meta name="description" content="Página inicial com o cronograma da coleta e outras informações." />
      </Helmet>
      
      {/* O resto do seu JSX para a página inicial aqui... */}
      {heroData.midiaUrl && (
        <section id="hero">
          <img src={`${process.env.REACT_APP_API_URL}${heroData.midiaUrl}`} alt={heroData.titulo} />
        </section>
      )}
      {/* etc... */}
    </>
  );
}
export default HomePage;
