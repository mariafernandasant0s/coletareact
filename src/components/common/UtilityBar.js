import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessibilityControls from './AccessibilityControls'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons'; 

function UtilityBar() {
  const [isContrastMode, setIsContrastMode] = useState(false);
  const navigate = useNavigate();

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

  const handleScrollToSubscribe = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
        const element = document.getElementById('inscrever');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        navigate('/#inscrever');
    }
  };

  return (
    <div className="utility-bar">
      <div className="container">
        
        <div className="utility-icons-group">
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
          
          <div className="notification-container">
            <a 
              href="#inscrever" 
              onClick={handleScrollToSubscribe} 
              className="utility-notification-bell"
              title="Receber notificações"
            >
              <FontAwesomeIcon icon={faBell} />
            </a>
          </div>
        </div>

        <AccessibilityControls toggleContrastMode={toggleContrastMode} />

      </div>
    </div>
   );
}

export default UtilityBar;
