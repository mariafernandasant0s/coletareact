// Arquivo: src/components/DesenvolvedorasContent.js (Atualizado)

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

// IMPORTANTE: Coloque suas fotos na pasta 'src/assets/imagens'
import fotoSua from '../assets/imagens/placeholder-sua-foto.jpeg'; // Troque pelo nome da sua foto
import fotoMariah from '../assets/imagens/placeholder-mariah-foto.jpeg'; // Troque pelo nome da foto dela

function DesenvolvedorasContent() {
  return (
    <>
      <div className="devs-container">
        {/* Card Maria Fernanda */}
        <div className="dev-card">
          <div className="dev-info">
            <h3>Maria Fernanda</h3>
            <p className="dev-role">
              Técnica em Informática para Internet pelo Instituto Federal do Paraná – Campus Assis Chateaubriand.
            </p>
            <p className="dev-description">
              Responsável pelo desenvolvimento do front-end do projeto.
            </p>
          </div>
          <img src={fotoSua} alt="Foto de Maria Fernanda" className="dev-photo" />
        </div>

        {/* Card Mariáh */}
        <div className="dev-card">
          <div className="dev-info">
            <h3>Mariáh </h3>
            <p className="dev-role">
              Técnica em Informática para Internet pelo Instituto Federal do Paraná – Campus Assis Chateaubriand.
            </p>
            <p className="dev-description">
              Responsável pelo desenvolvimento do back-end do projeto.
            </p>
          </div>
          <img src={fotoMariah} alt="Foto de Mariáh Fassina" className="dev-photo" />
        </div>
      </div>

      <div className="article-section">
        <h2 className="subtitulo-centralizado">Nosso Artigo</h2>
        <p className="article-summary">
          Aqui vai o resumo do artigo de vocês. Um ou dois parágrafos
          explicando sobre o que se trata o trabalho, a sua importância e o
          que os leitores encontrarão no documento completo.
        </p>
        <a href="#" className="download-button btn-gradiente">
          <FontAwesomeIcon icon={faDownload} />
          <span>Ver Mais (Em Breve)</span>
        </a>
      </div>
    </>
  );
}

export default DesenvolvedorasContent;