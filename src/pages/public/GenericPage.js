import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faDownload, faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import { apiPublic } from '../../config/api';
import { useLocation } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import EmailSubscriptionForm from '../../components/EmailSubscriptionForm';

import { getImageUrl } from '../../utils/imageUtils';


const HomePageLoader = () => (
  <main>
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <Skeleton height={350} style={{ marginBottom: '40px' }} />
      <div className="container">
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', gap: '15px' }}>
          <Skeleton width={40} height={40} />
          <Skeleton width={300} height={36} />
        </h2>
        <Skeleton height={500} style={{ borderRadius: '8px' }}/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Skeleton width={200} height={45} style={{ borderRadius: '50px' }} />
        </div>
        <div style={{ marginTop: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Skeleton width={450} height={200} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  </main>
);

function HomePage() {
  const [heroData, setHeroData] = useState(null);
  const [cronogramaData, setCronogramaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hintDismissed, setHintDismissed] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [heroRes, cronogramaRes] = await Promise.all([
          apiPublic.get('/api/paginas/slug/home-hero'),
          apiPublic.get('/api/paginas/slug/cronograma-da-coleta-de-residuos'),
        ]);
        
        setHeroData(heroRes.data);
        setCronogramaData(cronogramaRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados da página inicial:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [location, loading]);

  const handleImageInteraction = () => {
    setHintDismissed(true);
  };

  const handleDownload = async (e) => {
    e.preventDefault(); 
    const imageUrl = getImageUrl(cronogramaData.midiaUrl);
    const fileName = "Cronograma_Coleta_Assis_Chateaubriand.png";
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('A imagem não pôde ser carregada.');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
      window.open(imageUrl, '_blank');
    }
  };

  if (loading) {
    return <HomePageLoader />;
  }

  if (!heroData || !cronogramaData) {
    return (
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Oops! Não foi possível carregar a página.</h2>
        <p>Por favor, tente novamente mais tarde.</p>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Início - Coleta Seletiva de Assis Chateaubriand</title>
        <meta name="description" content="Página inicial com o cronograma da coleta e outras informações." />
      </Helmet>
      
      {heroData.midiaUrl && (
        <section id="hero">
          <img src={getImageUrl(heroData.midiaUrl)} alt={heroData.titulo} />
        </section>
      )}

      {cronogramaData.midiaUrl && (
        <section id="cronograma" className="info-section">
          <div className="container">
            <div className="titulo-principal">
              <h2>
                <FontAwesomeIcon icon={faCalendarDays} />
                {cronogramaData.titulo}
              </h2>
            </div>
            <div className="cronograma-container">
              <div 
                className="cronograma-zoom-wrapper" 
                onClick={handleImageInteraction} 
                onTouchStart={handleImageInteraction}
              >
                <img 
                  src={getImageUrl(cronogramaData.midiaUrl)} 
                  alt="Tabela com o cronograma semanal da coleta" 
                />
                {!hintDismissed && (
                  <div className="zoom-hint">
                    <FontAwesomeIcon icon={faUpDownLeftRight} />
                    <span>Pinça para ampliar</span>
                  </div>
                )}
              </div>
              {cronogramaData.ultimaAtualizacao && (
                <div className="cronograma-timestamp">
                  Atualizado em {cronogramaData.ultimaAtualizacao}
                </div>
              )}
              <a 
                href={getImageUrl(cronogramaData.midiaUrl)} 
                onClick={handleDownload} 
                className="download-button ripple"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Baixar Cronograma</span>
              </a>
            </div>
          </div>
        </section>
      )}

      <section 
        id="inscrever" 
        className="info-section" 
        style={{
          backgroundColor: '#f8f9fa', 
          paddingTop: '10px',
          paddingBottom: '60px'
        }}
      >
        <div className="container">
          <EmailSubscriptionForm />
        </div>
      </section>
    </>
  );
}

export default HomePage;

--- src/pages/public/GenericPage.js ---
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { apiPublic } from '../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


import LazySection from '../../components/common/LazySection';


import {
  faCode, faRecycle, faSeedling, faTrashCan, faUsers, faChartPie, faQuestionCircle, faPhone,
  faNewspaper, faBottleWater, faWineGlass, faGear, faDroplet, faLaptop, faCheckSquare,
  faChartLine, faLeaf, faHandHoldingDollar, faDownload, faChevronDown, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import fotoAcamar from '../../assets/imagens/foto-acamar-uvr.jpg';
import DesenvolvedorasContent from '../../components/DesenvolvedorasContent';
import { getImageUrl } from '../../utils/imageUtils';

const pageIcons = {
  'desenvolvedoras': faCode, 'quais-residuos': faRecycle, 'porque-separar': faSeedling,
  'como-fazer-separacao': faTrashCan, 'quem-somos': faUsers, 'total-coletado-grafico': faChartPie,
  'faq': faQuestionCircle, 'contato': faPhone
};


const MaterialsList = () => {
  const materialsData = [
    { icon: faNewspaper, title: 'Papéis', items: 'papelão, embalagens cartonadas, caixas de ovos, cadernos usados, caixas de leite longa vida, jornais, revistas, entre outros.' },
    { icon: faBottleWater, title: 'Plásticos', items: 'garrafa pet, embalagens de detergente, amaciante, óleo de cozinha, álcool, tampas de plástico, pacotes em gerais, frascos de xampu, potinhos de iogurte, sacolas de supermercados, copos descartáveis, balde, PVC, entre outros.' },
    { icon: faWineGlass, title: 'Vidros', items: 'garrafas de bebida, potes de conserva, frascos de perfume, potes de geleia, entre outros.' },
    { icon: faGear, title: 'Metais', items: 'latinhas de cerveja e refrigerante, latas de doces, leite em pó, azeite, latinhas de sardinha, arames, embalagens metálicas, latinhas de milho e ervilha, entre outros.' },
    { icon: faDroplet, title: 'Óleo Usado', items: 'óleo de cozinha utilizado (de fritura) tem que ser armazenado em garrafas PET ou em outros recipientes bem vedados antes de ser entregue à Coleta Amiga. ⚠️ Importante: nunca descarte óleo usado na pia ou no vaso sanitário, pois pode causar entupimentos e contaminar a água. 
    { icon: faLaptop, title: 'Eletrônicos', items: 'celulares, carregadores, notebooks, computadores, teclados, mouses, televisores, monitores, rádios, câmeras, pilhas, baterias, controles remotos, eletrodomésticos pequenos, entre outros. ⚠️ Importante: esses itens devem ser entregues em pontos de coleta específicos para resíduos eletroeletrônicos, pois contêm materiais tóxicos e recicláveis. A Coleta Amiga realiza a coleta, e posteriormente a ACAMAR encaminha os materiais para uma empresa especializada em logística reversa.
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
      <h4 className="subtitulo-centralizado">O que é a ACAMAR?</h4><p>A ACAMAR é a Associação dos Catadores de Materiais Recicláveis de Assis Chateaubriand - PR, fundada em 10 de outubro de 2001. Ela é considerada uma Entidade de Utilidade Pública, conforme a Lei Municipal n° 3.217 de 23 de abril de 2020.</p><h4 className="subtitulo-centralizado">Qual o local de destino dos recicláveis?</h4><p>Todo material previamente separado pela população e recolhido com auxílio dos caminhões da Coleta Amiga é encaminhado para a Unidade de Valorização de Recicláveis (UVR).</p>
      <img src={fotoAcamar} alt="Unidade de Valorização de Recicláveis da ACAMAR" style={{ margin: '35px auto 0 auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }} loading="lazy" />
      <h4 className="subtitulo-centralizado">Localização UVR</h4>
      <div className="map-container">
        <iframe 
            src="https://maps.google.com/maps?q=UVR%20-%20Unidade%20de%20Valoriza%C3%A7%C3%A3o%20de%20Recicl%C3%A1veis%20de%20Assis%20Chateaubriand&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="450" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da UVR no Google Maps">
        </iframe>
      </div>
    </div>
   );
};

const CronogramaContent = ({ pageData }) => (
  <div className="cronograma-container">
    {pageData?.midiaUrl ? (
      <>
        <img className="cronograma-image" src={getImageUrl(pageData.midiaUrl)} alt={pageData.titulo} loading="lazy" />
        <a href={getImageUrl(pageData.midiaUrl)} className="download-button" download>
          <FontAwesomeIcon icon={faDownload} /> Baixar Cronograma
        </a>
      </>
    ) : (
      <div style={{ textAlign: 'center', padding: '20px' }}><p>Imagem do cronograma não disponível.</p></div>
    )}
  </div>
);

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
            

          <a href="mailto:uvr.assischat@gmail.com">uvr.assischat@gmail.com</a>
        </div>
      </div>
      <div className="contact-item">
        <FontAwesomeIcon icon={faPhone} className="contact-icon" />
        <div>
          <strong>Telefone</strong>
            

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
          'desenvolvedoras': 'Desenvolvedoras', 'quem-somos': 'Quem Somos',
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

  if (loading) return <PageLoader />;
  if (!pageData) return ( <section className="info-section" style={{ textAlign: 'center' }}> <h2>Página não encontrada</h2> <p>O conteúdo que você está procurando não pôde ser carregado.</p> </section> );

if (loading) return <PageLoader />;
  if (!pageData) return ( <section className="info-section" style={{ textAlign: 'center' }}> <h2>Página não encontrada</h2> <p>O conteúdo que você está procurando não pôde ser carregado.</p> </section> );

 const renderPageContent = () => {
    switch (slug) {
      case 'desenvolvedoras': return <DesenvolvedorasContent />;
      case 'quem-somos': return <QuemSomosContent />;
      case 'quais-residuos': return <MaterialsList />;
      case 'cronograma': return <CronogramaContent pageData={pageData} />;
      case 'faq': return <FaqContent />;
      case 'contato': return <ContatoContent />;

      case 'total-coletado-grafico':
        return (
          <div className="content-wrapper">
            {pageData.midiaUrl && (
              <div className="page-media-container">
                <img loading="lazy" src={`${process.env.REACT_APP_API_URL}${pageData.midiaUrl}`} alt={pageData.titulo} className="page-image" />
              </div>
            )}
            {(pageData.conteudo && pageData.conteudo.trim() !== '') &&
              <div dangerouslySetInnerHTML={{ __html: pageData.conteudo }} />
            }
          </div>
        );

      default:
        return (pageData.conteudo && pageData.conteudo.trim() !== '')
          ? <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: pageData.conteudo }} />
          : null;
    }
  };

  const convertYouTubeUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    const patterns = [
      /(?:https?:\/\/ )?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/ )?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        videoId = match[1];
        break;
      }
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  return (
    <>
      <Helmet>
        <title>{`${pageData.titulo} | Coleta Seletiva Assis`}</title>
        <meta name="description" content={`Informações sobre ${pageData.titulo} no projeto de Coleta Seletiva de Assis Chateaubriand.`} />
      </Helmet>
      <section className="info-section">
        <div className="container">
          <LazySection>
            <div className="content-wrapper">
              <div className="titulo-principal">
                <h2>
                  {pageIcons[slug] && <FontAwesomeIcon icon={pageIcons[slug]} />}
                  {pageData.titulo}
                </h2>
              </div>
              {renderPageContent( )}
            </div>
          </LazySection>
        {}
        </div> {/* Fecha a div.container */}
      </section> {/* Fecha a section.info-section */}
    </> // Fecha o Fragment React
  );
}

export default GenericPage;



