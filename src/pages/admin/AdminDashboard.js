import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import TourGuia from '../../components/admin/TourGuia'; // Importa o tour simples
import './Admin.css';

// Ícones
const IconePagina = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>;
const IconeHero = ( ) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><polyline points="3 17 9 11 13 15 21 7"></polyline><circle cx="9" cy="9" r="2"></circle></svg>;
const IconeGrafico = ( ) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8a6 6 0 0 0-6-6"></path><path d="M13 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>;
const IconeContato = ( ) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconeLoading = ( ) => <div className="spinner-dashboard"></div>;
const IconeCalendario = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const IconePessoa = ( ) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconeTutorial = ( ) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;

const getIconForSlug = (slug ) => {
  if (slug.includes('cronograma')) return <IconeCalendario />;
  if (slug.includes('quem-somos')) return <IconePessoa />;
  if (slug.includes('hero')) return <IconeHero />;
  if (slug.includes('grafico')) return <IconeGrafico />;
  if (slug.includes('contato')) return <IconeContato />;
  return <IconePagina />;
};

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paginas, setPaginas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tourRodando, setTourRodando] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    const fetchPaginas = async () => {
      try {
        const { data } = await api.get('/api/paginas/admin');
        setPaginas(data);
      } catch (error) {
        console.error("Erro ao buscar páginas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaginas();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <AdminLayout>
      <TourGuia rodando={tourRodando} setRodando={setTourRodando} />
      <Helmet><title>Dashboard - Painel de Conteúdo</title></Helmet>
      <div className="painel-container">
        <header className="painel-header">
          <div>
            <h1>Painel de Conteúdo</h1>
            <p>Olá, {user.nome || 'Admin'}. Selecione uma seção para gerenciar.</p>
          </div>
          <button onClick={() => setTourRodando(true)} className="btn-secundario">
            <IconeTutorial />
            Tutorial
          </button>
        </header>

        {loading ? <IconeLoading /> : (
          <div className="lista-acoes">
            {paginas.map((pagina) => (
              <div key={pagina._id} className={`item-acao ${pagina.slug.includes('cronograma') ? 'item-destaque' : ''}`}>
                <div className="item-info">
                  <div className="item-icon">{getIconForSlug(pagina.slug)}</div>
                  <div>
                    <h2>{pagina.titulo}</h2>
                    <span>{pagina.slug}</span>
                  </div>
                </div>
                <Link to={`/admin/paginas/edit/${pagina._id}`} className="btn-acao-editar">
                  Editar
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
              </div>
             ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
