// src/components/animations/AnimateOnScroll.js

import React from 'react';
import { motion } from 'framer-motion';

// Este componente recebe 'children', que é o conteúdo que queremos animar.
// Ex: <AnimateOnScroll><MeuCard /></AnimateOnScroll>
function AnimateOnScroll({ children }) {
  
  // Configuração da animação
  const variants = {
    // Estado inicial (invisível e um pouco para baixo)
    hidden: { 
      opacity: 0, 
      y: 20 // Começa 20px abaixo da posição final
    },
    // Estado final (visível e na posição original)
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6, // Duração da animação em segundos
        ease: "easeOut" // Tipo de suavização
      }
    }
  };

  return (
    <motion.div
      // A animação começa quando o componente entra na tela
      initial="hidden"
      whileInView="visible"
      
      // 'viewport' controla QUANDO a animação deve disparar
      viewport={{ 
        once: true, // A animação acontece apenas uma vez
        amount: 0.3  // Dispara quando 30% do elemento estiver visível
      }}
      
      // Aplica as configurações de animação que definimos acima
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export default AnimateOnScroll;
