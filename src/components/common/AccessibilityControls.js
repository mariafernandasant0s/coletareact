// src/components/common/AccessibilityControls.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons';

function AccessibilityControls() {
  const [fontSize, setFontSize] = useState(100); // em porcentagem

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  const aumentarFonte = () => {
    if (fontSize < 150) setFontSize(fontSize + 10);
  };

  const diminuirFonte = () => {
    if (fontSize > 70) setFontSize(fontSize - 10);
  };

  return (
    <div className="accessibility-controls">
      <button onClick={diminuirFonte} aria-label="Diminuir fonte">A-</button>
      <button onClick={aumentarFonte} aria-label="Aumentar fonte">A+</button>
      <a href="#accessibility-info" aria-label="Acessibilidade">
        <FontAwesomeIcon icon={faUniversalAccess} />
      </a>
    </div>
  );
}

export default AccessibilityControls;
