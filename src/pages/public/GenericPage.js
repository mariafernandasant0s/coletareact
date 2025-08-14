import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiPublic } from '../../config/api';
import { Helmet } from 'react-helmet-async';

// Importa o componente de spinner localizado que criamos
import InlineSpinner from '../../components/InlineSpinner'; 

function GenericPage() {
  // Pega o 'slug' da URL (ex: /pagina/sobre-nos -> slug = 'sobre-nos')
  const { slug } = useParams(); 
  
  // Estados locais para controlar o ciclo de vida desta página
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true); // Inicia o loading da página
  const [error, setError] = useState(null);

  // Efeito que busca os dados da página sempre que o slug mudar
  useEffect(() => {
    const fetchPageData = async () => {
      // Reseta os estados para uma nova busca
      setLoading(true); 
      setError(null);
      setPageData(null);

      try {
        // Faz a chamada à API para buscar o conteúdo da página pelo slug
        const { data } = await apiPublic.get(`/api/paginas/slug/${slug}`);
        setPageData(data);
      } catch (err) {
        console.error(`Erro ao buscar a página com slug "${slug}":`, err);
        if (err.response && err.response.status === 404) {
          setError("Página não encontrada.");
        } else {
          setError("Oops! Não foi possível carregar o conteúdo desta página.");
        }
      } finally {
        // Finaliza o loading, independentemente do resultado
        setLoading(false); 
      }
    };

    fetchPageData();
  }, [slug]); // A dependência [slug] garante que a busca roda novamente se a URL mudar

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // 1. Se a página está carregando seus dados, mostra o spinner localizado
  if (loading) {
    return (
      <main className="container" style={{ padding: '60px 15px', textAlign: 'center' }}>
        <InlineSpinner />
      </main>
    );
  }

  // 2. Se ocorreu um erro na busca, exibe uma mensagem de erro clara
  if (error) {
    return (
      <main className="container" style={{ padding: '40px 15px', textAlign: 'center' }}>
        <h2>{error}</h2>
        <p>Por favor, verifique o endereço ou tente novamente mais tarde.</p>
      </main>
    );
  }

  // 3. Se a busca terminou mas não retornou dados, não renderiza nada (ou uma mensagem)
  if (!pageData) {
    return null; 
  }

  // 4. Se tudo correu bem, exibe o conteúdo da página
  return (
    <>
      <Helmet>
        {/* Define o título da aba do navegador dinamicamente */}
        <title>{pageData.titulo} - Coleta Seletiva de Assis Chateaubriand</title>
        <meta name="description" content={`Informações sobre ${pageData.titulo}`} />
      </Helmet>

      <main className="container" style={{ padding: '40px 15px' }}>
        <div className="titulo-principal" style={{ marginBottom: '30px' }}>
            {/* Você pode adicionar um ícone aqui se quiser, como na HomePage */}
            <h2>{pageData.titulo}</h2>
        </div>
        
        {/* Renderiza o conteúdo HTML que vem da API de forma segura */}
        <div dangerouslySetInnerHTML={{ __html: pageData.conteudo }} />
      </main>
    </>
  );
}

export default GenericPage;
