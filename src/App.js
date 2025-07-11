// src/App.js

import React from 'react';

// Nenhum outro import. Nenhuma outra dependência.
// Apenas um componente que retorna uma div.

function App() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ff4757', // Vermelho para indicar emergência
      color: 'white',
      textAlign: 'center',
      fontFamily: 'monospace',
      fontSize: '24px'
    }}>
      <div>
        <h1>TESTE FINAL DE ESTABILIDADE</h1>
        <p>Se você está lendo isto, a base do projeto Vercel está funcionando.</p>
        <p>O erro estava em um dos componentes que o App.js tentava carregar.</p>
      </div>
    </div>
  );
}

export default App;
