import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Admin.css';

const Spinner = () => <div className="spinner-dashboard"></div>;

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados para os campos do formulário
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [midiaUrl, setMidiaUrl] = useState('');
  
  // Estado APENAS para o arquivo selecionado no input
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  // Estados de controle da UI
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data } = await api.get(`/api/paginas/${id}`);
        setTitulo(data.titulo);
        setConteudo(data.conteudo);
        setMidiaUrl(data.midiaUrl || '');
      } catch (error) {
        console.error("Erro ao buscar dados da página:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [id]);

  // LÓGICA DE SUBMISSÃO UNIFICADA
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    formData.append('slug', titulo.toLowerCase().replace(/\s+/g, '-'));

    if (imagemSelecionada) {
      formData.append('midia', imagemSelecionada);
    } else {
      formData.append('midiaUrl', midiaUrl);
    }

    try {
      await api.put(`/api/paginas/${id}`, formData);
      
      alert('Página atualizada com sucesso!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      alert('Erro ao salvar as alterações.');
    } finally {
      setSaving(false);
    }
  };

  // Função para guardar o arquivo selecionado no estado
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemSelecionada(file);
      setMidiaUrl(URL.createObjectURL(file)); 
    }
  };

  if (loading) {
    return <AdminLayout><Spinner /></AdminLayout>;
  }

  return (
    <AdminLayout>
      {/* ==================== INÍCIO DO TESTE VISUAL "MARRETA" ==================== */}
      <h1 style={{
        backgroundColor: 'red', 
        color: 'white', 
        padding: '20px', 
        textAlign: 'center', 
        fontSize: '24px',
        margin: 0,
      }}>
        SE VOCÊ ESTÁ VENDO ISSO, O ARQUIVO É O CERTO!
      </h1>
      {/* ===================== FIM DO TESTE VISUAL "MARRETA" ===================== */}
      
      <Helmet><title>Editando: {titulo}</title></Helmet>
      <div className="painel-container">
        <header className="painel-header">
          <div>
            <h1>Editando Seção</h1>
            <p>"{titulo}"</p>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="form-edicao">
          <div className="form-group form-group-titulo">
            <label htmlFor="titulo">Título da Seção</label>
            <input id="titulo" className="form-input" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Conteúdo Principal</label>
            <ReactQuill theme="snow" value={conteudo} onChange={setConteudo} />
          </div>
          <div className="form-group">
            <label>Mídia Atual</label>
            {midiaUrl && (
              <div className="media-preview-wrapper">
                <img 
                  src={midiaUrl.startsWith('blob:') ? midiaUrl : `${process.env.REACT_APP_API_URL}${midiaUrl}`} 
                  alt="Prévia da mídia" 
                  className="media-preview" 
                />
              </div>
            )}
          </div>
          <div className="form-group form-group-upload">
            <label htmlFor="upload">Substituir por nova imagem:</label>
            <input id="upload" className="form-input-file" type="file" onChange={handleFileChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-principal" disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditPage;
