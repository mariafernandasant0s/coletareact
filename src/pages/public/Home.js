import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faDownload, faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import { apiPublic } from '../../config/api';
import { useLocation } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import EmailSubscriptionForm from '../../components/EmailSubscriptionForm';

const HomePageLoader = () => (
  <main>
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <Skeleton height={350} style={{ marginBottom: '40px' }} />
      <div className="container">
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', gap: '15px' }}>
          <Skeleton width={40} height={40} />
          <Skeleton width={300} height={36} />
        </h2>
        <Skeleton height={500} style={{ borderRadius: '8px' }}/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Skeleton width={200} height={45} style={{ borderRadius: '50px' }} />
        </div>
        <div style={{ marginTop: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <Skeleton width={450} height={200} />
            </div>
        </div>
      </div>
    </SkeletonTheme>
  </main>
);

function HomePage() {
  const [heroData, setHeroData] = useState(null);
  const [cronogramaData, setCronogramaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hintDismissed, setHintDismissed] = useState(false);

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
    if (!loading && location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [location, loading]);

  const handleImageInteraction = () => {
    setHintDismissed(true);
  };

  const handleDownload = async (e) => {
    e.preventDefault(); 
    const imageUrl = `${process.env.REACT_APP_API_URL}${cronogramaData.midiaUrl}`;
    const fileName = "Cronograma_Coleta_Assis_Chateaubriand.png";
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('A imagem não pôde ser carregada.');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
      window.open(imageUrl, '_blank');
    }
  };

  if (loading) {
    return <HomePageLoader />;
  }

  if (!heroData || !cronogramaData) {
    return (
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Oops! Não foi possível carregar a página.</h2>
        <p>Por favor, tente novamente mais tarde.</p>
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
              <h2>
                <FontAwesomeIcon icon={faCalendarDays} />
                {cronogramaData.titulo}
              </h2>
            </div>
            <div className="cronograma-container">
              <div className="cronograma-zoom-wrapper" onClick={handleImageInteraction} onTouchStart={handleImageInteraction}>
                <img src={`${process.env.REACT_APP_API_URL}${cronogramaData.midiaUrl}`} alt="Tabela com o cronograma semanal da coleta" />
                {!hintDismissed && (
                  <div className="zoom-hint">
                    <FontAwesomeIcon icon={faUpDownLeftRight} />
                    <span>Pince para ampliar</span>
                  </div>
                )}
              </div>
              {cronogramaData.ultimaAtualizacao && (
                <div className="cronograma-timestamp">
                  Atualizado em {cronogramaData.ultimaAtualizacao}
                </div>
              )}
              <a href={`${process.env.REACT_APP_API_URL}${cronogramaData.midiaUrl}`} onClick={handleDownload} className="download-button ripple">
                <FontAwesomeIcon icon={faDownload} />
                <span>Baixar Cronograma</span>
              </a>
            </div>
          </div>
        </section>
      )}

      <section 
        id="inscrever" 
        className="info-section" 
        style={{
          backgroundColor: '#f8f9fa', 
          paddingTop: '10px',
          paddingBottom: '60px'
        }}
      >
        <div className="container">
            <EmailSubscriptionForm />
        </div>
      </section>
    </>
  );
}

export default HomePage;
