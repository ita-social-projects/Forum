import React, { useState, useEffect, useRef } from 'react';
import css from './DropdownMenu.module.css';

function DropdownMenu({ children, toggleText }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onBodyClick = (e) => {
      if (!ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('mousedown', onBodyClick);

    return () => {
      document.body.removeEventListener('mousedown', onBodyClick);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={ref} className={css['dropdown-menu-tab']}>
      <span onClick={handleOpen} className={css['dropdown-menu-tab__text']}>
        {toggleText}
      </span>
      {isOpen && (
        <div onClick={handleOpen} className={css['dropdown-menu']}>
          {React.Children.map(children, (child) => {
            return child ? React.cloneElement(child, {
              className: css['dropdown-menu__text'],
            }): null;
          })}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
