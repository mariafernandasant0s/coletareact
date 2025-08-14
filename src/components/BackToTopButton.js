// src/components/BackToTopButton.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // 1. IMPORTE O ReactDOM
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    backgroundColor: '#0d6efd',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '1.2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
    opacity: 0,
    transform: 'translateY(100px)', // Começa fora da tela
  },
  buttonVisible: {
    opacity: 1,
    transform: 'translateY(0)', // Desliza para a posição final
  }
};

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // 2. O BOTÃO AGORA É RENDERIZADO DENTRO DO PORTAL
  return ReactDOM.createPortal(
    <button
      onClick={scrollToTop}
      style={{
        ...styles.button,
        ...(isVisible ? styles.buttonVisible : {})
      }}
      aria-label="Voltar ao topo"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>,
    document.body // 3. O DESTINO DO PORTAL É O <body> DO DOCUMENTO
  );
}

export default BackToTopButton;
