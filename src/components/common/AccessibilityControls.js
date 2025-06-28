// src/components/common/AccessibilityControls.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Ícone original que você tinha
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons';

function AccessibilityControls({ onIncreaseFontSize, onDecreaseFontSize }) {
  return (
    <div className="accessibility-controls">
      <button id="decrease-font" aria-label="Diminuir fonte" onClick={onDecreaseFontSize}>
        A-
      </button>
      <button id="increase-font" aria-label="Aumentar fonte" onClick={onIncreaseFontSize}>
        A+
      </button>
      {/* O link original de acessibilidade */}
      <a href="#accessibility-info" aria-label="Acessibilidade">
        <FontAwesomeIcon icon={faUniversalAccess} />
      </a>
    </div>
  );
}

export default AccessibilityControls;
