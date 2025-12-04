import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle, faCode } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import logoItaipu from '../../assets/imagens/logo-itaipu.png';
import logoInpar from '../../assets/imagens/logo-inpar.png';
import logoColetaAmiga from '../../assets/imagens/logo-coleta-amiga.png';
import logoAcamar from '../../assets/imagens/logo-acamar.png';
import logoEducacaoAmbiental from '../../assets/imagens/logo-educacao-ambiental.png';
import logoSecretaria from '../../assets/imagens/logo-secretaria.png';
import logoPrefeituraRodape from '../../assets/imagens/logo-prefeitura-rodape.png';
import logoIfpr from '../../assets/imagens/assis-vertical.png';
import logoOds6 from '../../assets/imagens/logo-ods6.png';
import logoOds8 from '../../assets/imagens/logo-ods8.png';
import logoOds10 from '../../assets/imagens/logo-ods10.png';
import logoOds11 from '../../assets/imagens/logo-ods11.png';
import logoOds12 from '../../assets/imagens/logo-ods12.png';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-line footer-logos">
        <div className="container">
          <h4 className="footer-section-title">Nossos Parceiros</h4>
          <img src={logoItaipu} alt="Logo Itaipu Binacional" className="logo-parceiro" />
          <img src={logoInpar} alt="Logo InPAR" className="logo-parceiro" />
          <img src={logoColetaAmiga} alt="Logo Programa Coleta Amiga" className="logo-principal-parceiro" />
          <img src={logoAcamar} alt="Logo ACAMAR" className="logo-parceiro" />
          <img src={logoEducacaoAmbiental} alt="Logo Educação Ambiental" className="logo-principal-parceiro" />
          <img src={logoSecretaria} alt="Logo Secretaria Municipal" className="logo-principal-parceiro" />
          <img src={logoPrefeituraRodape} alt="Logo Prefeitura" className="logo-principal-parceiro" />
          <img src={logoIfpr} alt="Logo IFPR Campus Assis Chateaubriand" className="logo-parceiro" />
        </div>
      </div>

      <div className="footer-line footer-ods">
        <div className="container">
          <h4 className="footer-section-title">Objetivos de Desenvolvimento Sustentável (ODS)</h4>
          <img src={logoOds6} alt="Logo ODS 6" />
          <img src={logoOds8} alt="Logo ODS 8" />
          <img src={logoOds10} alt="Logo ODS 10" />
          <img src={logoOds11} alt="Logo ODS 11" />
          <img src={logoOds12} alt="Logo ODS 12" />
        </div>
      </div>

      <div className="footer-quick-links">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Página Inicial
        </Link>
        <a href="https://www.instagram.com/uvr_assis/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} /> Insta UVR
        </a>
        <Link to="/faq">
          <FontAwesomeIcon icon={faQuestionCircle} /> FAQ
        </Link>
        <Link to="/desenvolvedoras">
          <FontAwesomeIcon icon={faCode} /> Desenvolvedoras
        </Link>
      </div>

      <div className="footer-copyright">
      <footer>

  <p>© 2025 Prefeitura Municipal de Assis Chateaubriand. Todos os direitos reservados.</p>

  <strong>Desenvolvido por:</strong> Maria Fernanda Ferreira dos Santos & Mariáh Bezerra Fassina – IFPR Campus Assis Chateaubriand

</footer>

 
      </div>
    </footer>
  );
}

export default Footer;

