import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 1. ADICIONADO O ÍCONE DE ENVELOPE (EMAIL)
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// IMPORTANTE: Coloque suas fotos na pasta 'src/assets/imagens'
import fotoSua from '../assets/imagens/placeholder-sua-foto.jpeg'; // Troque pelo nome da sua foto
import fotoMariah from '../assets/imagens/placeholder-devmariah.jpg'; // Troque pelo nome da foto dela

function DesenvolvedorasContent() {
  return (
    <>
      <div className="devs-container">
        {/* Card Maria Fernanda */}
        <div className="dev-card">
          <img src={fotoSua} alt="Foto de Maria Fernanda" className="dev-photo" />
          <div className="dev-info">
            <h3>Maria Fernanda</h3>
            <p className="dev-role">
              Técnica em Informática para Internet pelo Instituto Federal do Paraná – Campus Assis Chateaubriand.
            </p>
            <p className="dev-description">
              Responsável pelo desenvolvimento do front-end do projeto.
            </p>
            {/* 2. CAMPO DE EMAIL ADICIONADO */}
            <div className="dev-contact">
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:20233017583@estudantes.ifpr.edu.br">
                20233017583@estudantes.ifpr.edu.br
              </a>
            </div>
          </div>
        </div>

        {/* Card Mariáh */}
        <div className="dev-card">
          <img src={fotoMariah} alt="Foto de Mariáh Fassina" className="dev-photo" />
          <div className="dev-info">
            <h3>Mariáh Fassina</h3>
            <p className="dev-role">
              Técnica em Informática para Internet pelo Instituto Federal do Paraná – Campus Assis Chateaubriand.
            </p>
            <p className="dev-description">
              Responsável pelo desenvolvimento do back-end do projeto.
            </p>
            {/* 3. CAMPO DE EMAIL ADICIONADO */}
            <div className="dev-contact">
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:20233017592@estudantes.ifpr.edu.br">
                20233017592@estudantes.ifpr.edu.br
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="article-section">
        <h2 className="subtitulo-centralizado">Nosso Artigo</h2>
        <p className="article-summary">
         O artigo apresenta o desenvolvimento de um website sobre coleta seletiva para a Prefeitura de Assis Chateaubriand, com o objetivo de facilitar a comunicação entre a população e o poder público. O trabalho surgiu da necessidade de conscientizar a comunidade sobre a separação correta dos resíduos e valorizar o papel da ACAMAR, associação responsável pela coleta no município. O site foi elaborado por alunas do IFPR, com foco em acessibilidade, clareza e navegabilidade, trazendo informações sobre legislação, dicas práticas e a importância ambiental da reciclagem. Como resultado, foi criada uma ferramenta digital que contribui para a educação ambiental, promove a participação cidadã e fortalece a parceria entre a Prefeitura, a ACAMAR e a população local.
        </p>
        <a href="/caminho-para-o-artigo.pdf" className="download-button btn-gradiente" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faDownload} />
          <span>Ver Artigo Completo</span>
        </a>
      </div>
    </>
  );
}

export default DesenvolvedorasContent;

