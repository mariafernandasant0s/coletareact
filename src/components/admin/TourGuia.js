// src/components/admin/TourGuia.js

import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const PASSOS_DO_TOUR = [
  {
    target: '.painel-header h1',
    content: 'Bem-vindo ao Painel! Aqui você gerencia as seções do seu site.',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.item-acao:first-child',
    content: 'Cada seção é um item nesta lista. Você pode ver o título e o ícone correspondente.',
    placement: 'bottom',
    disableScrolling: true,
  },
  {
    target: '.item-acao:first-child .btn-acao-editar',
    content: 'Para modificar uma seção, basta clicar no botão "Editar". Simples assim!',
    placement: 'left',
    disableScrolling: true,
  }
];

const TourGuia = ({ rodando, setRodando }) => {
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRodando(false);
    }
  };

  return (
    <Joyride
      steps={PASSOS_DO_TOUR}
      run={rodando}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      callback={handleJoyrideCallback}
      locale={{ back: 'Voltar', close: 'Fechar', last: 'Fim', next: 'Próximo', skip: 'Pular' }}
      styles={{ options: { zIndex: 10000, primaryColor: '#0056b3' } }}
    />
  );
};

export default TourGuia;
