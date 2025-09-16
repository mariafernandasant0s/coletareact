// src/components/LoadingSpinner.js

import React from 'react';


const styles = {
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 9999, 
  },

  spinner: {
    border: '5px solid #f3f3f3', 
    borderTop: '5px solid #0d6efd', 
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite', 
  },

  loadingText: {
    marginTop: '20px',
    color: '#0a2c47', 
    fontSize: '1.2rem',
    fontWeight: '600',
  }
};


const StyleInjector = () => {
  const animationStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  return <style>{animationStyle}</style>;
};


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
