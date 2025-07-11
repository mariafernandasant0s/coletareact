// src/App.js

import React from 'react';

// Nenhum outro import. Nenhuma outra dependência.
// Apenas um componente que retorna uma div.

function App() {
  return (
    <div style={{
      boxSizing: 'border-box',
      margin: 0,
      padding: '100px',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#004466', // Um azul escuro e calmo
      color: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '60px' }}>BASE RECUPERADA</h1>
        <p style={{ fontSize: '24px', color: '#99ddff' }}>Se você está vendo isto, o sistema de deploy está funcionando.</p>
        <p style={{ marginTop: '30px' }}>O erro estava em um dos componentes que o App.js antigo importava.</p>
      </div>
    </div>
  );
}

export default App;
