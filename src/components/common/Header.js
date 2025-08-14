import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // 1. IMPORTE useLocation
import logoPrefeitura from '../../assets/imagens/logo-prefeitura.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faHome, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    
    // 2. PEGUE A LOCALIZAÇÃO ATUAL
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isMenuOpen) {
            setIsSubmenuOpen(false);
        }
    };

    const toggleSubmenu = (e) => {
        e.preventDefault();
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    // 3. FUNÇÃO DE ROLAGEM SIMPLIFICADA
    const handleLocalScroll = (e) => {
        e.preventDefault();
        closeAllMenus(); // Fecha os menus
        const section = document.getElementById('cronograma');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const closeAllMenus = () => {
        setIsMenuOpen(false);
        setIsSubmenuOpen(false);
    };

    // 4. VERIFICA SE ESTAMOS NA HOMEPAGE
    const isHomePage = location.pathname === '/';

    return (
        <header className={`main-header ${isMenuOpen ? 'menu-is-active' : ''}`}>
            <div className="container">
                <div className="logo-area">
                    <NavLink to="/" className="logo-link" onClick={closeAllMenus}>
                        <img src={logoPrefeitura} alt="Logo oficial da Prefeitura Municipal de Assis Chateaubriand" className="logo" />
                    </NavLink>
                </div>

                <button 
                    className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`} 
                    onClick={toggleMenu} 
                    aria-label="Abrir menu" 
                    aria-expanded={isMenuOpen}
                    aria-controls="main-nav"
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>

                <nav className={`main-nav ${isMenuOpen ? 'is-active' : ''}`} id="main-nav">
                    <ul>
                        <li><NavLink to="/" aria-label="Página Inicial" end onClick={closeAllMenus}><FontAwesomeIcon icon={faHome} /></NavLink></li>
                        
                        <li className={`has-submenu ${isSubmenuOpen ? 'submenu-is-active' : ''}`}>
                            <a href="/#" onClick={toggleSubmenu}>
                                Como separar
                                <FontAwesomeIcon icon={isSubmenuOpen ? faChevronUp : faChevronDown} className="icon-arrow" />
                            </a>
                            <ul className={`submenu ${isSubmenuOpen ? 'submenu-active' : ''}`}>
                                <li><NavLink to="/como-separar/como-fazer" onClick={closeAllMenus}>Como fazer a separação?</NavLink></li>
                                <li><NavLink to="/como-separar/residuos" onClick={closeAllMenus}>Quais são os resíduos recicláveis?</NavLink></li>
                                <li><NavLink to="/como-separar/porque-separar" onClick={closeAllMenus}>Por que separar os resíduos?</NavLink></li>
                            </ul>
                        </li>
                        
                        {/* 5. LÓGICA CONDICIONAL NO LINK DO CRONOGRAMA */}
                        <li>
                            {isHomePage ? (
                                // Se ESTÁ na Home, usa a função de rolagem local
                                <a href="#cronograma" onClick={handleLocalScroll}>Cronograma</a>
                            ) : (
                                // Se NÃO ESTÁ na Home, usa um NavLink para a Home com o hash
                                <NavLink to="/#cronograma" onClick={closeAllMenus}>Cronograma</NavLink>
                            )}
                        </li>

                        <li><a href="/docs/cartilha-deco.pdf" target="_blank" rel="noopener noreferrer" onClick={closeAllMenus}>Cartilha</a></li>
                        <li><NavLink to="/quemsomos" onClick={closeAllMenus}>Quem somos</NavLink></li>
                        <li><NavLink to="/total-coletado" onClick={closeAllMenus}>Total coletado</NavLink></li>
                        <li className="menu-contato-destaque">
                            <NavLink to="/contato" onClick={closeAllMenus}>Contato</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
