import React, { useState, useEffect } from 'react';
import './ScrollButton.css';
import arrow from "./arrow-img.svg"

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
      <div className={`scroll-button ${isVisible ? "visible" : ''}`} onClick={scrollToTop}>
        <img src={arrow} alt="UP"/>
      </div>
  );
};

export default ScrollButton;