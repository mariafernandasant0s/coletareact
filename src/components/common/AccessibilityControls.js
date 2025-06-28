// src/components/common/AccessibilityControls.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

function AccessibilityControls({ onToggleHighContrast }) {
  // Nota: As funções de aumentar/diminuir fonte foram removidas se não estiverem sendo usadas.
  // Se você as tinha, pode adicioná-las de volta. Foquei no alto contraste.
  return (
    <div className="accessibility-controls">
      <button id="decrease-font" aria-label="Diminuir fonte">
        A-
      </button>
      <button id="increase-font" aria-label="Aumentar fonte">
        A+
      </button>
      <button onClick={onToggleHighContrast} aria-label="Alternar alto contraste" title="Alto Contraste">
        <FontAwesomeIcon icon={faCircleHalfStroke} />
      </button>
    </div>
  );
}

export default AccessibilityControls;
