// src/App.js

import React, { useState, useEffect } from 'react'; // Importando os hooks necessários
import { Route, Routes, HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Componentes e Páginas
import UtilityBar from './components/UtilityBar';
import Header from './components/Header';
import Footer from './components/Footer';
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

// Configuração do CSS do Font Awesome (essencial para os ícones)
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function App() {
    // ---- LÓGICA DE ACESSIBILIDADE ADICIONADA AQUI ----

    // Cria um "estado" para guardar o tamanho da fonte, começando com 16px.
    const [fontSize, setFontSize] = useState(16);

    // Função para aumentar o tamanho da fonte (com um limite de 22px)
    const increaseFontSize = () => {
        setFontSize(currentSize => Math.min(currentSize + 1, 22));
    };

    // Função para diminuir o tamanho da fonte (com um limite de 12px)
    const decreaseFontSize = () => {
        setFontSize(currentSize => Math.max(currentSize - 1, 12));
    };

    // Este 'efeito' aplica o tamanho da fonte ao corpo da página sempre que o estado 'fontSize' mudar.
    useEffect(() => {
        document.body.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    // ---- FIM DA LÓGICA DE ACESSIBILIDADE ----

    return (
        <HelmetProvider>
            <HashRouter>
                <div>
                    {/* Passando as funções para a UtilityBar, que vai entregá-las aos botões */}
                    <UtilityBar
                        onIncreaseFontSize={increaseFontSize}
                        onDecreaseFontSize={decreaseFontSize}
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
                    
                    {/* Botão flutuante do Instagram */}
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
                    
                    <Footer />
                </div>
            </HashRouter>
        </HelmetProvider>
    );
}

export default App;
