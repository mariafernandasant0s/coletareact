// src/components/InlineSpinner.js
import React from 'react';


const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', 
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #0d6efd', 
    borderRadius: '50%',
    width: '30px', 
    height: '30px', 
    animation: 'spin 1s linear infinite',
  },
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
