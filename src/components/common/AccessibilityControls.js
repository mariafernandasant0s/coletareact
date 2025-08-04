// src/components/common/AccessibilityControls.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons';

function AccessibilityControls({ onIncreaseFontSize, onDecreaseFontSize }) {
  return (
    <div className="accessibility-controls">
      <button onClick={onDecreaseFontSize} aria-label="Diminuir tamanho da fonte" title="Diminuir Fonte">
        A-
      </button>
      <button onClick={onIncreaseFontSize} aria-label="Aumentar tamanho da fonte" title="Aumentar Fonte">
        A+
      </button>
      <a href="#accessibility-info" aria-label="Acessibilidade">
        <FontAwesomeIcon icon={faUniversalAccess} />
      </a>
    </div>
  );
}

export default AccessibilityControls;
