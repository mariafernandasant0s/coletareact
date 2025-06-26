// src/App.js

import React, { useState, useEffect } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Componentes e Páginas
import UtilityBar from './components/UtilityBar';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import Home from './pages/Home';
import Acamar from './pages/Acamar';
import Contato from './pages/Contato';
import TotalColetado from './pages/TotalColetado';
import ComoSepararComoFazer from './pages/ComoSepararComoFazer';
import ComoSepararResiduos from './pages/ComoSepararResiduos';
import ComoSepararPorqueSeparar from './pages/ComoSepararPorqueSeparar';
import Error404 from './pages/Error404';

// Ícone do Instagram para o botão flutuante
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

// Importações de Estilo
import './assets/css/style.css';
import './index.css';

// Configuração do CSS do Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function App() {
    // Lógica para controle de tamanho da fonte (acessibilidade)
    const [fontSize, setFontSize] = useState(16);

    const increaseFontSize = () => {
        setFontSize(currentSize => Math.min(currentSize + 2, 24));
    };

    const decreaseFontSize = () => {
        setFontSize(currentSize => Math.max(currentSize - 2, 12));
    };

    useEffect(() => {
        document.body.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    // =======================================================
    // NOVA LÓGICA PARA O MODO DE ALTO CONTRASTE
    // =======================================================
    const [isHighContrast, setHighContrast] = useState(false);

    const toggleHighContrast = () => {
        setHighContrast(prevState => !prevState);
    };

    // Efeito que adiciona ou remove a classe do body
    useEffect(() => {
        if (isHighContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }, [isHighContrast]);


    return (
        <HelmetProvider>
            <HashRouter>
                <div>
                    {/* Passando a nova função para a UtilityBar */}
                    <UtilityBar
                        onIncreaseFontSize={increaseFontSize}
                        onDecreaseFontSize={decreaseFontSize}
                        onToggleHighContrast={toggleHighContrast}
                    />
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/acamar" element={<Acamar />} />
                        <Route path="/contato" element={<Contato />} />
                        <Route path="/total-coletado" element={<TotalColetado />} />
                        <Route path="/como-separar/como-fazer" element={<ComoSepararComoFazer />} />
                        <Route path="/como-separar/residuos" element={<ComoSepararResiduos />} />
                        <Route path="/como-separar/porque-separar" element={<ComoSepararPorqueSeparar />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                    
                    <a
                        href="https://www.instagram.com/uvr_assis/"
                        className="sticky-insta"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Acesse nosso Instagram"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                        <span>Insta UVR</span>
                    </a>
                    
                    <BackToTopButton />
                    
                    <Footer />
                </div>
            </HashRouter>
        </HelmetProvider>
    );
}

export default App;