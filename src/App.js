// src/App.js

import React from 'react';
import './assets/css/style.css'; 

function App() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      backgroundColor: '#ff0055', // Rosa choque
      color: 'white', 
      fontSize: '24px', 
      fontFamily: 'sans-serif',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1>TESTE DE EMERGÊNCIA</h1>
      <p>Se você está lendo isto, a base do site foi recuperada.</p>
      <p>O problema não é mais o código.</p>
    </div>
  );
}

export default App;
