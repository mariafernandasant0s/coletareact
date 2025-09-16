// src/components/common/LazySection.js
import React, { useState, useEffect, useRef } from 'react';

function LazySection({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 } 
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);


  return (
    <div ref={ref} className={isVisible ? 'content-fade-in' : 'content-hidden'}>
      {children}
    </div>
  );
}
export default LazySection;
