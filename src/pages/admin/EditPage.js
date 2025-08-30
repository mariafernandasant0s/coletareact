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

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [midiaUrl, setMidiaUrl] = useState('');
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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('foto', file);
    try {
      const { data } = await api.post('/api/auth/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMidiaUrl(`/uploads/${data.arquivo}`);
      alert('Imagem enviada! Clique em "Salvar Alterações" para confirmar.');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar imagem.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/api/paginas/${id}`, { titulo, conteudo, midiaUrl });
      alert('Página atualizada com sucesso!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar as alterações.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLayout><Spinner /></AdminLayout>;
  }

  return (
    <AdminLayout>
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
            <label htmlFor="midiaUrl">Mídia (URL de Imagem/Vídeo ou Upload)</label>
            {midiaUrl && (
              <div className="media-preview-wrapper">
                {midiaUrl.includes('youtube') 
                  ? <p className="video-preview-text">URL do Vídeo: {midiaUrl}</p> 
                  : <img src={`${process.env.REACT_APP_API_URL}${midiaUrl}`} alt="Prévia da imagem" className="media-preview" />}
              </div>
            )}
            <input 
              type="text" 
              id="midiaUrl"
              className="form-input"
              value={midiaUrl} 
              onChange={(e) => setMidiaUrl(e.target.value)} 
              placeholder="Cole uma URL ou envie uma imagem abaixo" 
            />
          </div>
          <div className="form-group form-group-upload">
            <label htmlFor="upload">Substituir por nova imagem:</label>
            <input id="upload" className="form-input-file" type="file" onChange={handleUpload} />
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
