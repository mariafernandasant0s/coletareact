// src/components/EmailSubscriptionForm.js (Versão Final com Ícone Interno)

import React, { useState } from 'react';
import axios from 'axios';
import './EmailSubscriptionForm.css'; // O CSS "Premium" que finalizamos

// 1. IMPORTAR O FONT AWESOME E O ÍCONE
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Usando o sino, mas pode ser faEnvelope, etc.

const EmailSubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (toda a sua lógica de handleSubmit continua igual)
    setLoading(true);
    setMessage('');
    setError('');

    if (!email) {
      setError('Por favor, insira um e-mail.');
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/subscribe`, { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscription-form-container">
      {/* 2. ADICIONAR O ÍCONE AO LADO DO TÍTULO */}
      <h3>
        <FontAwesomeIcon icon={faBell} /> {/* <<< ÍCONE AQUI */}
        Fique por dentro das atualizações
      </h3>

      <p>Cadastre seu e-mail para receber um aviso sempre que o cronograma de coleta for atualizado.</p>

      <form onSubmit={handleSubmit} className="subscription-form">
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Inscrevendo...' : <span>Inscrever</span>}
        </button>

      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EmailSubscriptionForm;
