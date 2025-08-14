import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { apiPublic } from '../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faNewspaper, faBottleWater, faWineGlass, faGear, faRecycle, faSeedling,
  faTrashCan, faUsers, faClipboardList, faChartPie, faCalendarDays,
  faCheckSquare, faChartLine, faLeaf, faHandHoldingDollar, faDownload,
  faQuestionCircle, faChevronDown, faPhone, faCode
} from '@fortawesome/free-solid-svg-icons';

import fotoAcamar from '../../assets/imagens/foto-acamar-uvr.jpg';
import graficoTotalColetado from '../../assets/imagens/grafico-total-coletado.png';
// CAMINHO CORRIGIDO AQUI
import DesenvolvedorasContent from '../../components/DesenvolvedorasContent';

const pageIcons = {
  'desenvolvedoras': faCode,
  'quais-residuos': faRecycle, 'porque-separar': faSeedling, 'como-fazer-separacao': faTrashCan,
  'quem-somos': faUsers, 'total-coletado-grafico': faChartPie, 'faq': faQuestionCircle, 'contato': faPhone
};
const materialsData = [
  { icon: faNewspaper, title: 'Papéis', items: 'papelão, embalagens cartonadas, caixas de ovos, cadernos usados, caixas de leite longa vida, jornais, revistas, entre outros.' },
  { icon: faBottleWater, title: 'Plásticos', items: 'garrafa pet, embalagens de detergente, amaciante, óleo de cozinha, álcool, tampas de plástico, pacotes em gerais, frascos de xampu, potinhos de iogurte, sacolas de supermercados, copos descartáveis, balde, PVC, entre outros.' },
  { icon: faWineGlass, title: 'Vidros', items: 'garrafas de bebida, potes de conserva, frascos de perfume, potes de geleia, entre outros.' },
  { icon: faGear, title: 'Metais', items: 'latinhas de cerveja e refrigerante, latas de doces, leite em pó, azeite, latinhas de sardinha, arames, embalagens metálicas, latinhas de milho e ervilha, entre outros.' },
];
const objectivesData = [
    { icon: faCheckSquare, text: 'Regularizar a Coleta Seletiva de Resíduos Sólidos Recicláveis do Município;' },
    { icon: faChartLine, text: 'Valorizar os constantes investimentos realizados na Unidade de Valorização de Recicláveis – UVR;' },
    { icon: faLeaf, text: 'Desenvolver medidas em defesa do Meio Ambiente, articulando-as com planos e políticas em níveis nacional, estadual e municipal;' },
    { icon: faHandHoldingDollar, text: 'Estimular a geração de emprego e receita, em especial, para famílias de baixa renda.' },
];
const MaterialsList = () => (<div className="materials-list">{materialsData.map(m => (<div key={m.title} className="material-item"><div className="material-icon"><FontAwesomeIcon icon={m.icon} style={{ color: '#0056b3' }} /></div><div className="material-details"><h3>{m.title}</h3><p>{m.items}</p></div></div>))}</div>);
const QuemSomosContent = () => (<div className="content-wrapper"><h4 className="subtitulo-centralizado">O que é o Programa Coleta Amiga?</h4><p>O Programa Coleta Amiga foi instituído através da Lei Municipal nº 3250 em 03 de maio de 2022. Seus principais objetivos são:</p><div className="objectives-list">{objectivesData.map((o, i) => (<div key={i} className="objective-item"><div className="objective-icon"><FontAwesomeIcon icon={o.icon} style={{ color: '#0056b3' }} /></div><p className="objective-text">{o.text}</p></div>))}</div><br/><h4 className="subtitulo-centralizado">O que é a ACAMAR?</h4><p>A ACAMAR é a Associação dos Catadores de Materiais Recicláveis de Assis Chateaubriand - PR, fundada em 10 de outubro de 2001. Ela é considerada uma Entidade de Utilidade Pública, conforme a Lei Municipal n° 3.217 de 23 de abril de 2020.</p><h4 className="subtitulo-centralizado">Qual o local de destino dos recicláveis?</h4><p>Todo material previamente separado pela população e recolhido com auxílio dos caminhões da Coleta Amiga é encaminhado para a Unidade de Valorização de Recicláveis (UVR).</p><img src={fotoAcamar} alt="Unidade de Valorização de Recicláveis da ACAMAR" style={{ margin: '35px auto 0 auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }} /><br/><h4 className="subtitulo-centralizado">Localização UVR</h4><div className="map-container"><iframe src="https://maps.google.com/maps?q=UVR%20Unidade%20de%20Valoriza%C3%A7%C3%A3o%20de%20Recicl%C3%A1veis%20de%20Assis%20Chateaubriand&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização da ACAMAR no Google Maps"></iframe></div></div>);
const TotalColetadoContent = () => (<div className="content-wrapper" style={{ textAlign: 'center' }}><img src={graficoTotalColetado} alt="Gráfico do total de resíduos coletados" style={{ margin: '20px auto 0 auto', maxWidth: '100%' }} /></div>);
const CronogramaContent = ({ pageData }) => (<div className="cronograma-container">{pageData && pageData.midiaUrl ? (<><img className="cronograma-image" src={`${process.env.REACT_APP_API_URL}${pageData.midiaUrl}`} alt={pageData.titulo} /><a href={`${process.env.REACT_APP_API_URL}${pageData.midiaUrl}`} className="download-button" download><FontAwesomeIcon icon={faDownload} /> Baixar Cronograma</a></>) : (<div style={{ textAlign: 'center', padding: '20px' }}><p>Imagem do cronograma não disponível.</p></div>)}</div>);
const faqData = [{question: "O que acontece se eu misturar lixo orgânico com o reciclável?",answer: "Misturar lixo orgânico (restos de comida) com materiais recicláveis pode contaminar todo o lote, inviabilizando a reciclagem. O material contaminado acaba sendo destinado ao aterro sanitário, o que anula o esforço da separação. Por isso, é fundamental separar corretamente."},{question: "Preciso lavar as embalagens antes de descartar?",answer: "Sim, é importante passar uma água para remover os resíduos de alimentos das embalagens, como potes de iogurte, latas de molho e garrafas. Isso evita o mau cheiro, a proliferação de insetos e ajuda no processo de triagem na UVR."},{question: "O que não é reciclável?",answer: "Alguns itens comuns que não devem ser colocados no lixo reciclável são: papel higiênico, guardanapos sujos, fotografias, fitas adesivas, esponjas de aço, pilhas, baterias e lixo eletrónico (estes devem ter um descarte especial)."}];
function FaqContent() {
    const [openIndex, setOpenIndex] = useState(null);
    const handleToggle = (index) => { setOpenIndex(openIndex === index ? null : index); };
    return (<div className="content-wrapper faq-content">{faqData.map((item, index) => (<div className="faq-item" key={index}><button className={`faq-question ${openIndex === index ? 'is-open' : ''}`} onClick={() => handleToggle(index)}>{item.question}<FontAwesomeIcon icon={faChevronDown} className="faq-icon" /></button>{openIndex === index && (<div className="faq-answer"><p>{item.answer}</p></div>)}</div>))}</div>);
}
const convertYouTubeUrl = (url) => { if (!url) return ''; const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/; const match = url.match(regExp); return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : ''; };

function GenericPage({ slug }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => { setLoading(true); try { const { data } = await apiPublic.get(`/api/paginas/slug/${slug}`); setPageData(data || { titulo: 'Página não encontrada' }); } catch (error) { console.error(`Erro ao buscar a página ${slug}:`, error); setPageData(null); } finally { setLoading(false); } };
    const staticPages = {
        'desenvolvedoras': ' Desenvolvedoras',
        'quem-somos': 'Quem Somos', 'total-coletado-grafico': 'Total Coletado', 'faq': 'Perguntas Frequentes', 'quais-residuos': 'Quais são os Resíduos Recicláveis?', 'contato': 'Entre em Contato'
    };
    if (staticPages[slug]) { setPageData({ titulo: staticPages[slug] }); setLoading(false); } else { fetchPage(); }
  }, [slug]);
  
  if (loading) { return <div style={{ textAlign: 'center', padding: '40px' }}>Carregando...</div>; }
  if (!pageData) { return (<section className="info-section" style={{ textAlign: 'center' }}><h2>Página não encontrada</h2><p>O conteúdo que você está procurando não pôde ser carregado.</p></section>); }
  const pageIcon = pageIcons[slug];

  const renderPageContent = () => {
    switch (slug) {
      case 'desenvolvedoras': return <DesenvolvedorasContent />;
      case 'quem-somos': return <QuemSomosContent />;
      case 'quais-residuos': return <MaterialsList />;
      case 'cronograma': return <CronogramaContent pageData={pageData} />;
      case 'total-coletado-grafico': return <TotalColetadoContent />;
      case 'faq': return <FaqContent />;
      default: return (pageData.conteudo && pageData.conteudo.trim() !== '') ? <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: pageData.conteudo }} /> : <div style={{ textAlign: 'center', padding: '20px' }}><p>O conteúdo para esta página ainda não foi adicionado.</p></div>;
    }
  };

  return (
    <>
      <Helmet><title>{pageData?.titulo || 'Página'} - Coleta Seletiva</title></Helmet>
      <section className="info-section">
        <div className="container">
         
<div className="titulo-principal">
  {pageIcon && <FontAwesomeIcon icon={pageIcon} />}
  <h2>{pageData?.titulo || 'Sem título'}</h2>
</div>
          
          {renderPageContent()}
          
          {slug !== 'cronograma' && slug !== 'quem-somos' && slug !== 'total-coletado-grafico' && slug !== 'faq' && pageData.midiaUrl && (pageData.midiaUrl.includes('youtube.com') || pageData.midiaUrl.includes('youtu.be')) && (
            <iframe className="youtube-video" src={convertYouTubeUrl(pageData.midiaUrl)} title={pageData.titulo} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          )}
        </div>
      </section>
    </>
  );
}

export default GenericPage;
