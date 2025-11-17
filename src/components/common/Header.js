import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoPrefeitura from '../../assets/imagens/logo-prefeitura.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faHome, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const navRef = useRef();
    const menuToggleRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setIsScrolled(true);
            else setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && 
                navRef.current && !navRef.current.contains(event.target) &&
                menuToggleRef.current && !menuToggleRef.current.contains(event.target)
            ) {
                closeAllMenus();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Função de rolagem aprimorada para links âncora
    const handleScrollToAnchor = (e, anchorId) => {
        e.preventDefault();
        if (window.location.pathname === '/') {
            const element = document.getElementById(anchorId.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            navigate(`/${anchorId}`);
        }
        closeAllMenus();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isMenuOpen) setIsSubmenuOpen(false);
    };

    const toggleSubmenu = (e) => {
        e.preventDefault();
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    const closeAllMenus = () => {
        setIsMenuOpen(false);
        setIsSubmenuOpen(false);
    };

    return (
        <header className={`main-header ${isMenuOpen ? 'menu-is-active' : ''} ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="logo-area">
                    <NavLink to="/" className="logo-link" onClick={closeAllMenus}>
                        <img src={logoPrefeitura} alt="Logo da Prefeitura de Assis Chateaubriand" className="logo" />
                    </NavLink>
                </div>

                <button 
                    ref={menuToggleRef}
                    className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`} 
                    onClick={toggleMenu} 
                    aria-label="Abrir menu"
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>

                <nav ref={navRef} className={`main-nav ${isMenuOpen ? 'is-active' : ''}`} id="main-nav">
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
                        <li><a href="#cronograma" onClick={(e) => handleScrollToAnchor(e, '#cronograma')}>Cronograma</a></li>
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

