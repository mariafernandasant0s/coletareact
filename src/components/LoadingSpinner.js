// src/components/LoadingSpinner.js

import React from 'react';

// --- ESTILOS DO COMPONENTE DE LOADING ---
// Usamos estilos embutidos para não depender de um arquivo CSS externo.
const styles = {
  // Container que centraliza tudo na tela inteira
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo branco semitransparente
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 9999, // Garante que fique na frente de tudo
  },
  // A animação do spinner (o círculo que gira)
  spinner: {
    border: '5px solid #f3f3f3', // Círculo cinza claro
    borderTop: '5px solid #0d6efd', // "Ponteiro" azul que gira
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite', // Nome e duração da animação
  },
  // O texto "Carregando..."
  loadingText: {
    marginTop: '20px',
    color: '#0a2c47', // Azul escuro do seu cabeçalho
    fontSize: '1.2rem',
    fontWeight: '600',
  }
};

// Componente para injetar a animação de rotação na página
const StyleInjector = () => {
  const animationStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  return <style>{animationStyle}</style>;
};


// O componente principal
function LoadingSpinner() {
  return (
    <>
      <StyleInjector />
      <div style={styles.loadingOverlay}>
        <div style={styles.spinner}></div>
        <div style={styles.loadingText}>Carregando...</div>
      </div>
    </>
  );
}

export default LoadingSpinner;
