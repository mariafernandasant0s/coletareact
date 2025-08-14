// src/components/BackToTopButton.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

// --- ESTILOS DO BOTÃO ---
const styles = {
  button: {
    position: 'fixed', // Fica fixo na tela durante a rolagem
    bottom: '20px',    // 20px do fundo
    right: '20px',     // 20px da direita
    zIndex: 1000,      // Garante que fique sobre outros elementos

    // Aparência
    backgroundColor: '#0d6efd', // Azul do seu menu
    color: 'white',
    border: 'none',
    borderRadius: '50%', // Círculo perfeito
    width: '50px',       // Largura
    height: '50px',      // Altura
    fontSize: '1.2rem',  // Tamanho do ícone
    
    // Layout interno
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // Efeitos
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.3s ease, transform 0.3s ease', // Transição suave
    
    // Visibilidade inicial (começa invisível)
    opacity: 0,
    transform: 'translateY(20px)', // Começa um pouco para baixo
  },
  // Estilo para quando o botão está visível
  buttonVisible: {
    opacity: 1,
    transform: 'translateY(0)', // Move para a posição original
  }
};

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Função para rolar a página para o topo suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Efeito para monitorar a rolagem da página
  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão se a rolagem for maior que 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Adiciona o "ouvinte" de rolagem
    window.addEventListener('scroll', toggleVisibility);

    // Limpa o "ouvinte" quando o componente é desmontado (boa prática)
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      style={{
        ...styles.button,
        ...(isVisible ? styles.buttonVisible : {}) // Aplica o estilo de visibilidade
      }}
      aria-label="Voltar ao topo"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}

export default BackToTopButton;
