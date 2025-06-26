// src/pages/public/Home.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHandPointer, faDownload } from '@fortawesome/free-solid-svg-icons';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Use os imports corretos de assets
import heroImg from '../../assets/imagens/caminhao-coleta.jpg';
import cronogramaImg from '../../assets/imagens/cronograma-atual.png';

function HomePage() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Helmet>
                <title>Início - Coleta Seletiva de Assis Chateaubriand</title>
                <meta name="description" content="Página inicial do site da Coleta Seletiva de Assis Chateaubriand. Encontre informações sobre o cronograma, como separar e muito mais." />
            </Helmet>
            
            <section id="hero">
                <img src={heroImg} alt="Banner principal da campanha de coleta seletiva" />
            </section>

            <section id="cronograma" className="info-section">
                <div className="container">
                    <h2>
                        <FontAwesomeIcon icon={faCalendarDays} />
                        Cronograma da Coleta de Resíduos
                    </h2>
                    <p style={{textAlign: 'center', maxWidth: '600px'}}>
                        Aqui você encontra os dias e horários da coleta seletiva e orgânica em seu bairro. Clique na imagem para ampliar.
                    </p>
                    <div className="cronograma-container">
                        <div onClick={() => setOpen(true)} style={{cursor: 'pointer', maxWidth: '740px', margin: '0 auto'}}>
                            <img src={cronogramaImg} alt="Tabela com o cronograma semanal da coleta seletiva e orgânica" />
                        </div>
                        <div className="zoom-hint">
                            <FontAwesomeIcon icon={faHandPointer} />
                            <span>Pince para ampliar</span>
                        </div>
                        <a href={cronogramaImg} download="Cronograma_Coleta_Assis_Chateaubriand.png" className="download-button ripple">
                            <FontAwesomeIcon icon={faDownload} />
                            <span>Baixar Cronograma</span>
                        </a>
                    </div>
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={[{ src: cronogramaImg, alt: "Cronograma da Coleta Seletiva" }]}
                    />
                </div>
            </section>
        </>
    );
}

// Renomeie a exportação para HomePage para bater com AppRoutes.js
export default HomePage;