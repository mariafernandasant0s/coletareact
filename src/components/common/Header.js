import React, { useState, useEffect, useRef } from 'react'; // 1. Adicionamos o 'useRef'
import { NavLink, useNavigate } from 'react-router-dom';
import logoPrefeitura from '../../assets/imagens/logo-prefeitura.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faHome, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    // 2. Criamos "referências" para o menu e para o botão
    const navRef = useRef();
    const menuToggleRef = useRef();

    // Lógica do Header flutuante (continua igual)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setIsScrolled(true);
            else setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // --- LÓGICA NOVA PARA DETECTAR CLIQUE FORA ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Se o menu estiver aberto e o clique NÃO for dentro do menu E NÃO for no botão, feche o menu
            if (isMenuOpen && 
                navRef.current && !navRef.current.contains(event.target) &&
                menuToggleRef.current && !menuToggleRef.current.contains(event.target)
            ) {
                closeAllMenus();
            }
        };

        // Adiciona o "ouvinte" de cliques no documento
        document.addEventListener('mousedown', handleClickOutside);
        
        // Limpa o "ouvinte" quando o componente for desmontado
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]); // Este efeito depende do menu estar aberto ou fechado


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
        // O Fragment <> não é mais necessário pois removemos o overlay
        <header className={`main-header ${isMenuOpen ? 'menu-is-active' : ''} ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="logo-area">
                    <NavLink to="/" className="logo-link" onClick={closeAllMenus}>
                        <img src={logoPrefeitura} alt="Logo da Prefeitura de Assis Chateaubriand" className="logo" />
                    </NavLink>
                </div>

                {/* 3. Adicionamos a referência ao botão */}
                <button 
                    ref={menuToggleRef}
                    className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`} 
                    onClick={toggleMenu} 
                    aria-label="Abrir menu"
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>

                {/* 4. Adicionamos a referência ao menu */}
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
                        <li><NavLink to="/#cronograma" onClick={closeAllMenus}>Cronograma</NavLink></li>
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
        // 5. A div do OVERLAY foi REMOVIDA
    );
}

export default Header;
