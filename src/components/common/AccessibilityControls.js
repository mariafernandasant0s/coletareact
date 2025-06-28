// src/components/common/AccessibilityControls.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// ✅ Importa o ícone de contraste (meia-lua)
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

// ✅ Recebe a função onToggleHighContrast
function AccessibilityControls({ onIncreaseFontSize, onDecreaseFontSize, onToggleHighContrast }) {
  return (
    <div className="accessibility-controls">
      <button id="decrease-font" aria-label="Diminuir fonte" onClick={onDecreaseFontSize}>
        A-
      </button>
      <button id="increase-font" aria-label="Aumentar fonte" onClick={onIncreaseFontSize}>
        A+
      </button>
      {/* ✅ Troca o link antigo por um botão que ativa a função */}
      <button onClick={onToggleHighContrast} aria-label="Alternar alto contraste" title="Alto Contraste">
        <FontAwesomeIcon icon={faCircleHalfStroke} />
      </button>
    </div>
  );
}

export default AccessibilityControls;
