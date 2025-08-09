import React, { useState, useEffect } from 'react'; // 1. Adicionar useState e useEffect
import AccessibilityControls from './AccessibilityControls'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function UtilityBar() {
  // 2. ADICIONAR A LÓGICA DE CONTRASTE AQUI
  const [isContrastMode, setIsContrastMode] = useState(false);

  const toggleContrastMode = () => {
    setIsContrastMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const bodyClass = 'contrast-mode';
    if (isContrastMode) {
      document.body.classList.add(bodyClass);
    } else {
      document.body.classList.remove(bodyClass);
    }
  }, [isContrastMode]);
  // FIM DA LÓGICA DE CONTRASTE

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
        {/* 3. Passar a função de contraste para o componente filho */}
        <AccessibilityControls toggleContrastMode={toggleContrastMode} />
      </div>
    </div>
  );
}

export default UtilityBar;
