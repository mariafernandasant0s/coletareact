// src/hooks/useOnClickOutside.js

import { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Se o clique for dentro do menu (ref.current) ou em um elemento que o contém, não faz nada
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Se o clique for fora, chama a função handler (que será a nossa função de fechar o menu)
      handler(event);
    };

    // Adiciona os event listeners
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Função de limpeza: remove os listeners quando o componente for desmontado
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Roda o efeito novamente se a referência ou o handler mudarem
}

export default useOnClickOutside;
