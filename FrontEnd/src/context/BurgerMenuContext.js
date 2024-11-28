import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const BurgerMenuContext = createContext();

export const BurgerMenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <BurgerMenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </BurgerMenuContext.Provider>
  );
};

BurgerMenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBurgerMenu = () => useContext(BurgerMenuContext);
