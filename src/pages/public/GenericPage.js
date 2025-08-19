// src/pages/public/GenericPage.js

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AnimateOnScroll from '../../components/animations/AnimateOnScroll';

import { apiPublic } from '../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// --- Ícones e Componentes ---
import {
  faNewspaper, faBottleWater, faWineGlass, faGear, faRecycle, faSeedling,
  faTrashCan, faUsers, faChartPie, faQuestionCircle, faPhone, faCode,
  faCheckSquare, faChartLine, faLeaf, faHandHoldingDollar, faDownload, faChevronDown,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import fotoAcamar from '../../assets/imagens/foto-acamar-uvr.jpg';
import graficoTotalColetado from '../../assets/imagens/grafico-total-coletado.png';
import DesenvolvedorasContent from '../../components/DesenvolvedorasContent';

const pageIcons = {
  'desenvolvedoras': faCode, 'quais-residuos': faRecycle, 'porque-separar': faSeedling,
  'como-fazer-separacao': faTrashCan, 'quem-somos': faUsers, 'total-coletado-grafico': faChartPie,
  'faq': faQuestionCircle, 'contato': faPhone
};

// --- Componentes Internos ---

const MaterialsList = () => { /* ... (código do MaterialsList) ... */ };

const QuemSomosContent = () => {
  const objectivesData = [
    { icon: faCheckSquare, text: 'Regularizar a Coleta Seletiva de Resíduos Sólidos Recicláveis do Município;' },
    { icon: faChartLine, text: 'Valorizar os constantes investimentos realizados na Unidade de Valorização de Recicláveis – UVR;' },
    { icon: faLeaf, text: 'Desenvolver medidas em defesa do Meio Ambiente, articulando-as com planos e políticas em níveis nacional, estadual e municipal;' },
    { icon: faHandHoldingDollar, text: 'Estimular a geração de emprego e receita, em especial, para famílias de baixa renda.' },
  ];
  return (
    <div className="content-wrapper">
      <h4 className="subtitulo-centralizado">O que é o Programa Coleta Amiga?</h4><p>O Programa Coleta Amiga foi instituído através da Lei Municipal nº 3250 em 03 de maio de 2022. Seus principais objetivos são:</p><div className="objectives-list">{objectivesData.map((o, i) => (<div key={i} className="objective-item"><div className="objective-icon"><FontAwesomeIcon icon={o.icon} style={{ color: '#0056b3' }} /></div><p className="objective-text">{o.text}</p></div>))}</div>
      <h4 className="subtitulo-centralizado">O que é a ACAMAR?</h4><p>A ACAMAR é a Associação dos Catadores de Materiais Recicláveis de Assis Chateaubriand - PR, fundada em 10 de outubro de 2001. Ela é considerada uma Entidade de Utilidade Pública, conforme a Lei Municipal n° 3.217 de 23 de abril de 2020.</p><h4 className="subtitulo-centralizado">Qual o local de destino dos recicláveis?</h4><p>Todo material previamente separado pela população e recolhido com auxílio dos caminhões da Coleta Amiga é encaminhado para a Unidade de Valorização de Recicláveis (UVR).</p><img src={fotoAcamar} alt="Unidade de Valorização de Recicláveis da ACAMAR" style={{ margin: '35px auto 0 auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }} loading="lazy" />
      <h4 className="subtitulo-centralizado">Localização UVR</h4>
      <div className="map-container">
        {/* IFRAME ATUALIZADO AQUI */}
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3633.7922928942185!2d-53.478903499999994!3d-24.388527999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f3a9a0df9b73f3%3A0x1a27a21825729844!2sUVR%20-%20Unidade%20de%20Valoriza%C3%A7%C3%A3o%20de%20Recicl%C3%A1veis%20de%20Assis%20Chateaubriand!5e0!3m2!1spt-BR!2sbr!4v1755568245970!5m2!1spt-BR!2sbr" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
};

const TotalColetadoContent = () => { /* ... (código do TotalColetadoContent) ... */ };
const CronogramaContent = ({ pageData }) => { /* ... (código do CronogramaContent) ... */ };
const FaqContent = () => { /* ... (código do FaqContent) ... */ };
const ContatoContent = () => { /* ... (código do ContatoContent) ... */ };
const PageLoader = () => { /* ... (código do PageLoader) ... */ };

function GenericPage({ slug }) {
  // ... (resto do seu código da GenericPage) ...
}

export default GenericPage;
