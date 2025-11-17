import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 1. ADICIONADO O ÍCONE DE ENVELOPE (EMAIL)

import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// IMPORTANTE: Coloque suas fotos na pasta 'src/assets/imagens'
import fotoSua from '../assets/imagens/placeholder-sua-foto.jpeg'; // Troque pelo nome da sua foto
import fotoMariah from '../assets/imagens/placeholder-mariah-foto.jpg'; // Troque pelo nome da foto dela

import fotoSua from '../assets/imagens/placeholder-sua-foto.jpeg'; 
import fotoMariah from '../assets/imagens/placeholder-mariah-foto.jpg'; 

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
RESUMO
O crescente volume de resíduos sólidos urbanos representa um desafio significativo para os municípios brasileiros, demandando soluções eficazes para sua gestão. Em Assis Chateaubriand, a descontinuidade de um website informativo em 2020 comprometeu a comunicação sobre a coleta seletiva, dificultando o acesso da população a informações essenciais, como cronograma e diretrizes de separação, e limitando a adesão ao programa Coleta Amiga, operacionalizado pela Associação dos Catadores de Materiais Recicláveis (ACAMAR). Diante dessa problemática, o presente trabalho teve como objetivo o desenvolvimento de um novo website para a coleta seletiva do município, visando restabelecer um canal de comunicação oficial, acessível e atualizado. A metodologia envolveu o levantamento de requisitos junto ao Departamento de Meio Ambiente, o desenvolvimento de um protótipo e a implementação de uma plataforma digital utilizando tecnologias como React para o front-end e Node.js para o back-end. O resultado é um site responsivo e interativo, que centraliza o cronograma de coleta, guias de separação de resíduos, dados sobre o volume coletado e informações sobre o programa. A plataforma inclui um painel administrativo que permite à gestão municipal atualizar os conteúdos de forma autônoma, solucionando o problema de obsolescência informacional. Adicionalmente, foram integrados recursos de acessibilidade, como tradução para Libras e controles de contraste e fonte, e um sistema de notificação por e-mail para manter os cidadãos informados a respeito de atualizações do cronograma. O projeto conclui-se com a entrega de uma solução tecnológica funcional que fortalece a gestão de resíduos, promove a conscientização ambiental e facilita o engajamento da comunidade chateaubriandense.
Palavras-chave: coleta seletiva; gestão de resíduos; comunicação digital; website; conscientização ambiental.
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
