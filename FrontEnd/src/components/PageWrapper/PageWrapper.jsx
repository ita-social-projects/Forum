import React from 'react';
import PropTypes from 'prop-types';
import { useBurgerMenu } from '../../context/BurgerMenuContext';
import css from './PageWrapper.module.css';

const PageWrapper = ({ children }) => {
  const { isOpen } = useBurgerMenu();

  return (
    <div className={`${css.pageContent} ${isOpen ? css.menuOpen : ''}`}>
      {children}
    </div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
