// src/components/Header.js

import React, { useState } from 'react'; // 1. Importe o useState
import { NavLink } from 'react-router-dom';
import logoPrefeitura from '../assets/imagens/logo-prefeitura.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faHome, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header() {
    // 2. Crie os estados para controlar o menu principal e o submenu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    // 3. Crie as funções para alterar os estados
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Fecha o submenu se o menu principal for fechado
        if (isMenuOpen) {
            setIsSubmenuOpen(false);
        }
    };

    const toggleSubmenu = (e) => {
        e.preventDefault(); // Impede que o link "#" pule para o topo da página
        setIsSubmenuOpen(!isSubmenuOpen);
    };


    return (
        // Adiciona uma classe 'menu-active' ao header quando o menu está aberto para ajudar no estilo se necessário
        <header className={`main-header ${isMenuOpen ? 'menu-is-active' : ''}`}>
            <div className="container">
                <div className="logo-area">
                    <NavLink to="/" className="logo-link">
                        <img src={logoPrefeitura} alt="Logo oficial da Prefeitura Municipal de Assis Chateaubriand" className="logo" />
                    </NavLink>
                </div>

                {/* 4. Botão do menu agora tem um onClick e atributos de acessibilidade */}
                <button 
                    className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`} 
                    onClick={toggleMenu} 
                    aria-label="Abrir menu" 
                    aria-expanded={isMenuOpen}
                    aria-controls="main-nav"
                >
                    <FontAwesomeIcon icon={faBars} className="icon-open" />
                    <FontAwesomeIcon icon={faTimes} className="icon-close" />
                </button>

                {/* 5. A navegação recebe a classe 'is-active' quando o menu está aberto */}
                <nav className={`main-nav ${isMenuOpen ? 'is-active' : ''}`} id="main-nav">
                    <ul>
                        <li><NavLink to="/" aria-label="Página Inicial" end onClick={() => setIsMenuOpen(false)}><FontAwesomeIcon icon={faHome} /></NavLink></li>
                        
                        {/* 6. Submenu agora também é controlado pelo estado */}
                        <li className={`has-submenu ${isSubmenuOpen ? 'submenu-is-active' : ''}`}>
                            <a href="#" onClick={toggleSubmenu}>
                                Como separar
                                {/* Troca a seta para cima/baixo */}
                                <FontAwesomeIcon icon={isSubmenuOpen ? faChevronUp : faChevronDown} className="icon-arrow" />
                            </a>
                            <ul className={`submenu ${isSubmenuOpen ? 'submenu-active' : ''}`}>
                                <li><NavLink to="/como-separar/como-fazer" onClick={() => setIsMenuOpen(false)}>Como fazer a separação?</NavLink></li>
                                <li><NavLink to="/como-separar/residuos" onClick={() => setIsMenuOpen(false)}>Quais são os resíduos recicláveis?</NavLink></li>
                                <li><NavLink to="/como-separar/porque-separar" onClick={() => setIsMenuOpen(false)}>Por que separar os resíduos?</NavLink></li>
                            </ul>
                        </li>
                        
                        <li><NavLink to="/#cronograma" onClick={() => setIsMenuOpen(false)}>Cronograma</NavLink></li>
                        <li><a href="docs/cartilha-deco.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Cartilha</a></li>
                        <li><NavLink to="/acamar" onClick={() => setIsMenuOpen(false)}>Quem somos</NavLink></li>
                        <li><NavLink to="/total-coletado" onClick={() => setIsMenuOpen(false)}>Total coletado</NavLink></li>
                        <li className="menu-contato-destaque">
                            <NavLink to="/contato" onClick={() => setIsMenuOpen(false)}>Contato</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;