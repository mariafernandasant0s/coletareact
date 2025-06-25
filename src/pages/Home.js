// src/pages/Home.js

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
 * ===================================================================
 * Ícone e texto da dica de zoom corrigidos para serem mais claros.
 * ===================================================================
 */
import { faCalendarDays, faHandPointer } from '@fortawesome/free-solid-svg-icons';

/*
 * ===================================================================
 * LEMBRETE:
 * Substitua os nomes em MAIÚSCULAS pelos nomes exatos dos seus
 * ficheiros de imagem na pasta /src/assets/imagens/
 * ===================================================================
 */
import heroImg from '../assets/imagens/caminhao-coleta.jpg'; // <-- MUDE "hero-image.jpg"
import cronogramaImg from '../assets/imagens/cronograma-atual.png'; // <-- MUDE "cronograma.png"

function Home() {
    return (
        <>
            <Helmet>
                <title>Início - Coleta Seletiva de Assis Chateaubriand</title>
                <meta name="description" content="Página inicial do site da Coleta Seletiva de Assis Chateaubriand. Encontre informações sobre o cronograma, como separar e muito mais." />
            </Helmet>
            <main>
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
                            Aqui você encontra os dias e horários da coleta seletiva e orgânica em seu bairro.
                        </p>

                        <div className="cronograma-container">
                            <img src={cronogramaImg} alt="Tabela com o cronograma semanal da coleta seletiva e orgânica" />
                            
                            <div className="zoom-hint">
                                <FontAwesomeIcon icon={faHandPointer} />
                                <span>Pince para ampliar</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;
