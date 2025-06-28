// src/components/common/AccessibilityControls.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

function AccessibilityControls({ onIncreaseFontSize, onDecreaseFontSize, onToggleHighContrast }) {
  return (
    <div className="accessibility-controls">
      <button onClick={onDecreaseFontSize} aria-label="Diminuir tamanho da fonte" title="Diminuir Fonte">
        A-
      </button>
      <button onClick={onIncreaseFontSize} aria-label="Aumentar tamanho da fonte" title="Aumentar Fonte">
        A+
      </button>
      <button onClick={onToggleHighContrast} aria-label="Alternar alto contraste" title="Alto Contraste">
        <FontAwesomeIcon icon={faCircleHalfStroke} />
      </button>
    </div>
  );
}

export default AccessibilityControls;
