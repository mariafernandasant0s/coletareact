// src/components/InlineSpinner.js
import React from 'react';

// Estilos para um spinner pequeno e localizado
const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Um pouco de espaço em volta
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #0d6efd', // Azul do seu site
    borderRadius: '50%',
    width: '30px', // Tamanho menor
    height: '30px', // Tamanho menor
    animation: 'spin 1s linear infinite',
  },
};

// Injetor de animação (pode ser omitido se já estiver global)
const StyleInjector = () => {
  const animationStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  return <style>{animationStyle}</style>;
};

function InlineSpinner() {
  return (
    <>
      <StyleInjector />
      <div style={styles.spinnerContainer}>
        <div style={styles.spinner}></div>
      </div>
    </>
  );
}

export default InlineSpinner;
