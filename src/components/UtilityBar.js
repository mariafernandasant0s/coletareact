// src/components/UtilityBar.js

import React from 'react';
import AccessibilityControls from './AccessibilityControls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

// Recebe a nova propriedade onToggleHighContrast
function UtilityBar({ onIncreaseFontSize, onDecreaseFontSize, onToggleHighContrast }) {
  return (
    <div className="utility-bar">
      <div className="container">
        <div className="social-media">
          <a
            href="https://www.instagram.com/uvr_assis/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da UVR Assis"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        {/* Passa a propriedade para o componente filho */}
        <AccessibilityControls
          onIncreaseFontSize={onIncreaseFontSize}
          onDecreaseFontSize={onDecreaseFontSize}
          onToggleHighContrast={onToggleHighContrast}
        />
      </div>
    </div>
  );
}

export default UtilityBar;