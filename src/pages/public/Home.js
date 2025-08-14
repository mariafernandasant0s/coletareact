import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faDownload, faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons'; 
import { apiPublic } from '../../config/api';
import { useLocation } from 'react-router-dom';

function HomePage() {
  const [heroData, setHeroData] = useState(null);
  const [cronogramaData, setCronogramaData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // LÓGICA DO "PINCE PARA AMPLIAR" REINTRODUZIDA
  const [hintDismissed, setHintDismissed] = useState(false);

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
      } catch (error) { console.error("Erro ao buscar dados da página inicial:", error); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const location = useLocation();
  // LÓGICA DO SCROLL PARA O CRONOGRAMA (JÁ ESTAVA CORRETA)
  useEffect(() => {
    if (location.hash && cronogramaData) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location, cronogramaData]);

  // FUNÇÃO PARA LIDAR COM O TOQUE/CLIQUE NA IMAGEM
  const handleImageInteraction = () => {
    setHintDismissed(true);
  };

  if (loading) { return <main style={{ padding: '40px', textAlign: 'center' }}><p>Carregando...</p></main>; }
  if (!heroData || !cronogramaData) { return ( <main style={{ padding: '40px', textAlign: 'center' }}> <h2>Oops! Não foi possível carregar a página.</h2> <p>Por favor, tente novamente mais tarde.</p> </main> ); }
 
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
              <div 
                className="cronograma-zoom-wrapper" 
                onClick={handleImageInteraction}
                onTouchStart={handleImageInteraction}
              >
                <img src={`${process.env.REACT_APP_API_URL}${cronogramaData.midiaUrl}`} alt="Tabela com o cronograma semanal da coleta" />
                
                {/* A DICA AGORA SÓ APARECE SE AINDA NÃO FOI DISPENSADA */}
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
              <a href={`${process.env.REACT_APP_API_URL}${cronogramaData.midiaUrl}`} download="Cronograma_Coleta_Assis_Chateaubriand.png" className="download-button ripple">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Baixar Cronograma</span>
              </a>
            </div>
            {/* O Lightbox (zoom em tela cheia) continua removido */}
          </div>
        </section>
      )}
    </>
  );
}

export default HomePage;
