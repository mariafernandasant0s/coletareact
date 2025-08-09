import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons'; // Apenas o ícone de contraste

// 1. Receber a nova função { toggleContrastMode } como propriedade
function AccessibilityControls({ toggleContrastMode }) {
  const [fontSize, setFontSize] = useState(100); 

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  const increaseFont = () => {
    if (fontSize < 150) {
      setFontSize(prev => prev + 10);
    }
  };

  const decreaseFont = () => {
    if (fontSize > 70) {
      setFontSize(prev => prev - 10);
    }
  };

  return (
    <div className="accessibility-controls">
      <button onClick={decreaseFont} aria-label="Diminuir fonte">A-</button>
      <button onClick={increaseFont} aria-label="Aumentar fonte">A+</button>
      
      {/* 2. O botão de contraste agora chama a função recebida */}
      <button onClick={toggleContrastMode} aria-label="Ativar modo de alto contraste">
        <FontAwesomeIcon icon={faAdjust} />
      </button>

      {/* O outro ícone foi removido, como pedido */}
    </div>
  );
}

export default AccessibilityControls;
