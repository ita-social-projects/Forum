import React, { useState, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import Menu from './Menu';
import SearchBox from './SearchBox';
import css from './BurgerMenu.module.css';

const BurgerMenu = () => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const pageContent = document.getElementById('page-content');
    if (pageContent) {
      pageContent.style.marginTop = isOpen ? '180px' : '0';
    }
  }, [isOpen]);

  return (
    <div className={css.burgerMenuContainer}>
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        size={30}
        className={css.hamburgerIcon}
      />
      <div className={`${css.menu} ${isOpen ? css.open : ''}`}>
        {isOpen && (
          <>
            <SearchBox className={css.searchBar} />
            <Menu />
          </>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
