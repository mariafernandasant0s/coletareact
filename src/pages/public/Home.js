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
  const [open, setOpen] = useState(false); // Para o Lightbox

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ CORREÇÃO CRÍTICA APLICADA AQUI
        // As URLs agora usam o caminho correto '/slug/' que o backend espera.
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

  // Se os dados não carregarem, mostra uma mensagem de erro em vez de quebrar a página
  if (!heroData || !cronogramaData) {
    return (
        <section className="info-section">
            <div className="container" style={{ textAlign: 'center' }}>
                <h2>Não foi possível carregar a página</h2>
                <p>Houve um problema de comunicação com o servidor. Por favor, tente recarregar a página.</p>
            </div>
        </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Início - Coleta Seletiva de Assis Chateaubriand</title>
        <meta name="description" content="Página inicial com o cronograma da coleta e outras informações." />
      </Helmet>
      
      <section id="hero">
        <img src={`${process.env.REACT_APP_API_URL}${heroData.midiaUrl}`} alt={heroData.titulo} />
      </section>

      <section id="cronograma" className="info-section">
        <div className="container">
          <h2>
            <FontAwesomeIcon icon={faCalendarDays} />
            {cronogramaData.titulo}
          </h2>
          <div className="cronograma-container" style={{textAlign: 'center'}}>
            <p>{cronogramaData.conteudo}</p>
            <div onClick={() => setOpen(true)} style={{cursor: 'pointer', maxWidth: '740px', margin: '20px auto'}}>
              <img src={`${process.env.REACT_APP_API_URL}${cronogramaData.midiaUrl}`} alt="Tabela com o cronograma semanal da coleta" />
            </div>
            <div className="zoom-hint">
              <FontAwesomeIcon icon={faHandPointer} />
              <span>Pince para ampliar</span>
            </div>
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
    </>
  );
}

export default HomePage;
