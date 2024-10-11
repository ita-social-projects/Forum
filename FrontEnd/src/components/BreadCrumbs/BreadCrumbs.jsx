import { Link, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { useAuth } from '../../hooks';

import css from './BreadCrumbs.module.css';

const BreadCrumbs = ({ currentPage }) => {
  const navigate = useNavigate();
  const { isStaff } = useAuth();
  const goBackHandler = () => {
    navigate(-1);
  };
  return (
    <div className={css['content']}>
      { !isStaff ? (
        <button
          className={css['goback__button']}
          type="button"
          onClick={goBackHandler}
        >
          <i className={css['left']}></i>Назад
        </button>
      ) : null
      }
      {!isStaff ? (
        <Link className={css['main-page__button']} to="/">
          Головна
        </Link>
        ) : (
        <Link className={css['main-page__button']} to="/customadmin">
          Панель адміністратора
        </Link>)
      }
      <i className={css['right']}></i>
      <div className={css['current-page__button']}>{currentPage}</div>
    </div>
  );
};

BreadCrumbs.propTypes = {
  currentPage: PropTypes.string,
};

export default BreadCrumbs;
