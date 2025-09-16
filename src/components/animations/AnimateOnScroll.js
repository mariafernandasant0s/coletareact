import React from 'react';
import { motion } from 'framer-motion';

function AnimateOnScroll({ children }) {
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      
      viewport={{ 
        once: true, 
        amount: 0.3  
      }}
      
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export default AnimateOnScroll;
