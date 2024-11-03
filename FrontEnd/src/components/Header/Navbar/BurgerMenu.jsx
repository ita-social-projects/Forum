import React, { useState } from 'react';
import Hamburger from 'hamburger-react';
import Menu from './Menu';
import SearchBox from './SearchBox';
import css from './BurgerMenu.module.css';

const BurgerMenu = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={css.burgerMenuContainer}>
      <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          size={30}
          className={css.hamburgerIcon}
      />
      {isOpen && (
        <div className={css.menu}>
          <SearchBox className={css.searchBar} />
          <Menu />
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
