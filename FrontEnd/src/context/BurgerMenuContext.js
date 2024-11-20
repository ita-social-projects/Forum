import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const BurgerMenuContext = createContext();

export const BurgerMenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

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
