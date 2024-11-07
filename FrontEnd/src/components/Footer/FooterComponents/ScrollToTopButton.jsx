import { useState, useEffect } from 'react';

import css from './ScrollToTopButton.module.css';


const ScrollToTopButton = () => {
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
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`${css['scroll-to-top-button']} ${isVisible ? css.visible : ''}`}
      onClick={scrollToTop}
    >
      &#8679;
    </div>
  );
};

export default ScrollToTopButton;
