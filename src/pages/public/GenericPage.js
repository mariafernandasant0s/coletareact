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

const MaterialsList = () => {
  const materialsData = [
    { icon: faNewspaper, title: 'Papéis', items: 'papelão, embalagens cartonadas, caixas de ovos, cadernos usados, caixas de leite longa vida, jornais, revistas, entre outros.' },
    { icon: faBottleWater, title: 'Plásticos', items: 'garrafa pet, embalagens de detergente, amaciante, óleo de cozinha, álcool, tampas de plástico, pacotes em gerais, frascos de xampu, potinhos de iogurte, sacolas de supermercados, copos descartáveis, balde, PVC, entre outros.' },
    { icon: faWineGlass, title: 'Vidros', items: 'garrafas de bebida, potes de conserva, frascos de perfume, potes de geleia, entre outros.' },
    { icon: faGear, title: 'Metais', items: 'latinhas de cerveja e refrigerante, latas de doces, leite em pó, azeite, latinhas de sardinha, arames, embalagens metálicas, latinhas de milho e ervilha, entre outros.' },
  ];
  return <div className="materials-list">{materialsData.map((m, index) => (<div key={m.title} className="material-item animated" style={{ animationDelay: `${index * 0.15}s` }}><div className="material-icon"><FontAwesomeIcon icon={m.icon} style={{ color: '#0056b3' }} /></div><div className="material-details"><h3>{m.title}</h3><p>{m.items}</p></div></div>))}</div>;
};

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
        {/* URL DO MAPA ATUALIZADA AQUI */}
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3633.7922928942185!2d-53.478903499999994!3d-24.388527999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f3a9a0df9b73f3%3A0x1a27a21825729844!2sUVR%20-%20Unidade%20de%20Valoriza%C3%A7%C3%A3o%20de%20Recicl%C3%A1veis%20de%20Assis%20Chateaubriand!5e0!3m2!1spt-BR!2sbr!4v1755569389724!5m2!1spt-BR!2sbr" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      </div>
    </div>
  );
};

const TotalColetadoContent = () => <div className="content-wrapper" style={{ textAlign: 'center' }}><img src={graficoTotalColetado} alt="Gráfico do total de resíduos coletados" style={{ margin: '20px auto 0 auto', maxWidth: '100%' }} loading="lazy" /></div>;
const CronogramaContent = ({ pageData }) => <div className="cronograma-container">{pageData?.midiaUrl ? (<><img className="cronograma-image" src={`${process.env.REACT_APP_API_URL}${pageData.midiaUrl}`} alt={pageData.titulo} /><a href={`${process.env.REACT_APP_API_URL}${pageData.midiaUrl}`} className="download-button" download><FontAwesomeIcon icon={faDownload} /> Baixar Cronograma</a></>) : (<div style={{ textAlign: 'center', padding: '20px' }}><p>Imagem do cronograma não disponível.</p></div>)}</div>;
const FaqContent = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqData = [
    { question: "Meu saco de ráfia foi extraviado, o que eu faço agora?", answer: "Você pode continuar separando normalmente os materiais recicláveis usando caixas de papelão ou sacolas de supermercado; o saco é apenas um auxílio. A entrega ocorre anualmente pelo município." },
    { question: "Estou com bastante material reciclado na minha propriedade, posso agendar a coleta?", answer: "Sim. O agendamento pode ser feito normalmente pelo contato 44 99183 3010." },
    { question: "A coleta seletiva ocorre em dias chuvosos?", answer: "Sim, a coleta ocorre normalmente." },
    { question: "Em feriados ocorre a coleta?", answer: "Sim, a coleta ocorre normalmente, exceto em feriados como Natal e Ano Novo. Nos demais feriados pode haver alteração; se houver mudança, será informada com antecedência pelos canais oficiais da UVR." },
    { question: "A coleta no meu bairro é pela manhã. Posso deixar o material na frente da minha residência na noite anterior?", answer: "Não. Deixar na noite anterior aumenta o risco de ser coletado pela coleta convencional, por pessoas informais ou ter contato com animais da região." },
    { question: "Eu separo os recicláveis e deixo tudo na lixeira em frente à minha casa, mas não exatamente no dia em que o caminhão do material reciclável passa no meu bairro. Estes meus resíduos serão encaminhados para reciclagem?", answer: "Possivelmente não. Há risco de ser coletado pela coleta convencional, que encaminha o material para a Unidade de Transbordo e Aterro Sanitário, resultando na perda de todo o material." }
  ];
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="content-wrapper faq-content">
      {faqData.map((item, index) => (
        <div className="faq-item" key={index}>
          <button
            className={`faq-question ${openIndex === index ? 'is-open' : ''}`}
            onClick={() => handleToggle(index)}
          >
            {item.question}
            <FontAwesomeIcon icon={faChevronDown} className="faq-icon" />
          </button>
          <div className={`faq-answer ${openIndex === index ? 'is-open' : ''}`}>
            <div className="faq-answer-content">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ContatoContent = () => {
  return (
    <div className="contact-info-container">
      <div className="contact-item">
        <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
        <div>
          <strong>Email</strong>
          <br />
          <a href="mailto:uvr.assischat@gmail.com">uvr.assischat@gmail.com</a>
        </div>
      </div>
      <div className="contact-item">
        <FontAwesomeIcon icon={faPhone} className="contact-icon" />
        <div>
          <strong>Telefone</strong>
          <br />
          <a href="tel:+5544991833010">(44) 99183-3010</a>
        </div>
      </div>
    </div>
  );
};

const PageLoader = () => (
  <section className="info-section">
    <div className="container" style={{ padding: '20px 0' }}>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <div className="content-wrapper">
          <div className="titulo-principal" style={{ justifyContent: 'center', marginBottom: '40px' }}>
            <h2><Skeleton width={300} /></h2>
          </div>
          <p><Skeleton count={5} /></p>
          <p style={{ marginTop: '1rem' }}><Skeleton count={4} /></p>
        </div>
      </SkeletonTheme>
    </div>
  </section>
);

function GenericPage({ slug }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const staticPages = {
          'desenvolvedoras': 'Desenvolvedoras', 'quem-somos': 'Quem Somos', 'total-coletado-grafico': 'Total Coletado',
          'faq': 'Perguntas Frequentes', 'quais-residuos': 'Quais são os Resíduos Recicláveis?', 'contato': 'Entre em Contato'
        };
        if (staticPages[slug]) {
          setPageData({ titulo: staticPages[slug] });
        } else {
          const { data } = await apiPublic.get(`/api/paginas/slug/${slug}`);
          setPageData(data || { titulo: 'Página não encontrada', conteudo: '' });
        }
      } catch (error) {
        console.error(`Erro ao buscar a página ${slug}:`, error);
        setPageData({ titulo: 'Erro ao Carregar', conteudo: 'Não foi possível carregar o conteúdo desta página.' });
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [slug]);

  if (loading) {
    return <PageLoader />;
  }

  if (!pageData) {
    return (
      <section className="info-section" style={{ textAlign: 'center' }}>
        <h2>Página não encontrada</h2>
        <p>O conteúdo que você está procurando não pôde ser carregado.</p>
      </section>
    );
  }

  const renderPageContent = () => {
    switch (slug) {
      case 'desenvolvedoras': return <DesenvolvedorasContent />;
      case 'quem-somos': return <QuemSomosContent />;
      case 'quais-residuos': return <MaterialsList />;
      case 'cronograma': return <CronogramaContent pageData={pageData} />;
      case 'total-coletado-grafico': return <TotalColetadoContent />;
      case 'faq': return <FaqContent />;
      case 'contato': return <ContatoContent />;
      default:
        return (pageData.conteudo && pageData.conteudo.trim() !== '')
          ? <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: pageData.conteudo }} />
          : <div style={{ textAlign: 'center', padding: '20px' }}><p>O conteúdo para esta página ainda não foi adicionado.</p></div>;
    }
  };

  const convertYouTubeUrl = (url) => { if (!url) return ''; const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/; const match = url.match(RegExp); return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : ''; };

  return (
    <>
      <Helmet>
        <title>{`${pageData.titulo} | Coleta Seletiva Assis`}</title>
        <meta name="description" content={`Informações sobre ${pageData.titulo} no projeto de Coleta Seletiva de Assis Chateaubriand.`} />
      </Helmet>
      <section className="info-section">
        <div className="container">
          <div className="content-wrapper content-fade-in">
            <div className="titulo-principal">
              <h2>
                {pageIcons[slug] && <FontAwesomeIcon icon={pageIcons[slug]} />}
                {pageData.titulo}
              </h2>
            </div>
            {renderPageContent()}
          </div>

          {pageData.midiaUrl && (pageData.midiaUrl.includes('youtube.com') || pageData.midiaUrl.includes('youtu.be')) && (
            <AnimateOnScroll>
              <iframe className="youtube-video" src={convertYouTubeUrl(pageData.midiaUrl)} title={pageData.titulo} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </>
  );
}

export default GenericPage;


