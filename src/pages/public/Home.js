import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 1. ÍCONE CORRETO IMPORTADO AQUI
import { faCalendarDays, faDownload, faSearchPlus } from '@fortawesome/free-solid-svg-icons'; 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { apiPublic } from '../../config/api';
import { useLocation } from 'react-router-dom';

function HomePage() {
  const [heroData, setHeroData] = useState(null);
  const [cronogramaData, setCronogramaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    setTimeout(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  }, [location]);

  if (loading) {
    return <main style={{ padding: '140px', textAlign: 'center' }}><p>Carregando...</p></main>;
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
      <Helmet>
        <title>Início - Coleta Seletiva de Assis Chateaubriand</title>
        <meta name="description" content="Página inicial com o cronograma da coleta e outras informações." />
      </Helmet>
     
      {heroData.midiaUrl && (
        <section id="hero">
          <img src={`${process.env.REACT_APP_API_URL}${heroData.midiaUrl}`} alt={heroData.titulo} />
        </section>
      )}

      {cronogramaData.midiaUrl && (
        <section id="cronograma" className="info-section">
          <div className="container">
            <div className="titulo-principal">
              <FontAwesomeIcon icon={faCalendarDays} />
              <h2>{cronogramaData.titulo}</h2>
            </div>

            <div className="cronograma-container">
              <div className="cronograma-zoom-wrapper" onClick={() => setOpen(true)}>
                <img src={`${process.env.REACT_APP_API_URL}${cronogramaData.midiaUrl}`} alt="Tabela com o cronograma semanal da coleta" />
                <div className="zoom-hint">
                  {/* 2. ÍCONE CORRETO USADO AQUI */}
                  <FontAwesomeIcon icon={faSearchPlus} />
                  <span>Pince para ampliar</span>
                </div>
              </div>

              {cronogramaData.ultimaAtualizacao && (
                <div className="cronograma-timestamp">
                  Atualizado em {cronogramaData.ultimaAtualizacao}
                </div>
              )}
              <a href={`${process.env.REACT_APP_API_URL}${cronogramaData.midiaUrl}`} download="Cronograma_Coleta_Assis_Chateaubriand.png" className="download-button ripple">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Baixar Cronograma</span>
              </a>
            </div>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: `${process.env.REACT_APP_API_URL}${cronogramaData.midiaUrl}`, alt: "Cronograma da Coleta Seletiva" }]}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default HomePage;

