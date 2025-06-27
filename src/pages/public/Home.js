// src/pages/public/Home.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHandPointer, faDownload } from '@fortawesome/free-solid-svg-icons';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import api from '../../config/api';

function HomePage() {
  const [heroData, setHeroData] = useState(null);
  const [cronogramaData, setCronogramaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // As URLs corrigidas com '/slug/'
        const [heroRes, cronogramaRes] = await Promise.all([
          api.get('/api/paginas/slug/home-hero'),
          api.get('/api/paginas/slug/home-cronograma'),
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
    return <main className="container" style={{padding: '40px 15px', textAlign: 'center'}}><p>Carregando...</p></main>;
  }

  return (
    <>
      {/* ✅ TESTE DE FOGO: SE ISTO APARECER, O DEPLOY FUNCIONOU */}
      <h1 style={{ textAlign: 'center', backgroundColor: 'yellow', padding: '10px' }}>
        TESTE DE DEPLOY
      </h1>

      <Helmet>
        <title>Início - Coleta Seletiva de Assis Chateaubriand</title>
        <meta name="description" content="Página inicial com o cronograma da coleta e outras informações." />
      </Helmet>
      
      {heroData && heroData.midiaUrl && (
        <section id="hero">
          <img src={`${process.env.REACT_APP_API_URL}${heroData.midiaUrl}`} alt={heroData.titulo} />
        </section>
      )}

      {cronogramaData && cronogramaData.midiaUrl && (
        <section id="cronograma" className="info-section">
          {/* ... resto do seu código JSX ... */}
        </section>
      )}
    </>
  );
}

export default HomePage;
