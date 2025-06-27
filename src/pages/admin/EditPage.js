// src/pages/admin/EditPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Admin.css';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [midiaUrl, setMidiaUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // ✅ CORREÇÃO AQUI: URL corrigida para não incluir '/admin/'
        const { data } = await api.get(`/api/paginas/${id}`);
        setTitulo(data.titulo);
        setConteudo(data.conteudo);
        setMidiaUrl(data.midiaUrl || '');
      } catch (error) {
        console.error("Erro ao buscar dados da página:", error);
        alert('Não foi possível carregar os dados para edição.');
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [id]);

  const handleUpload = async (e) => { /* ...código existente sem alterações... */ };
  const handleSubmit = async (e) => { /* ...código existente sem alterações... */ };

  // O resto do componente continua o mesmo...
  if (loading) { return <AdminLayout><p>Carregando editor...</p></AdminLayout>; }
  return (
    <AdminLayout>
      <Helmet><title>Editando: {titulo}</title></Helmet>
      <div className="admin-content">
        <h1>Editando: "{titulo}"</h1>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="titulo">Título da Seção</label>
            <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Conteúdo Principal</label>
            <ReactQuill theme="snow" value={conteudo} onChange={setConteudo} />
          </div>
          <div className="form-group">
            <label htmlFor="midia">Mídia (URL da Imagem/Vídeo)</label>
            {midiaUrl && ( /* ... */ )}
            <input type="text" value={midiaUrl} onChange={(e) => setMidiaUrl(e.target.value)} placeholder="Cole uma URL de vídeo ou envie uma imagem abaixo" />
            <label htmlFor="upload" style={{ marginTop: '15px', display: 'block' }}>Substituir por nova imagem:</label>
            <input type="file" id="upload" onChange={handleUpload} />
          </div>
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditPage;
