// src/components/common/AccessibilityControls.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons';

function AccessibilityControls() {
  return (
    <div className="accessibility-controls">
      <button aria-label="Diminuir fonte">
        A-
      </button>
      <button aria-label="Aumentar fonte">
        A+
      </button>
      <a href="#accessibility-info" aria-label="Acessibilidade">
        <FontAwesomeIcon icon={faUniversalAccess} />
      </a>
    </div>
  );
}

export default AccessibilityControls;
