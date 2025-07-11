// src/components/common/AccessibilityControls.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons';

// ✅ AGORA ELE RECEBE E USA AS FUNÇÕES
function AccessibilityControls({ onIncreaseFontSize, onDecreaseFontSize }) {
  return (
    <div className="accessibility-controls">
      {/* ✅ onClick CONECTADO */}
      <button onClick={onDecreaseFontSize} aria-label="Diminuir tamanho da fonte" title="Diminuir Fonte">
        A-
      </button>
      {/* ✅ onClick CONECTADO */}
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
