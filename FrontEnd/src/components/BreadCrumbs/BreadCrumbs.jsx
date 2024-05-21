import css from './BreadCrumbs.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const BreadCrumbs = ({ currentPage }) => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };
  return (
    <div className={css['content']}>
      <button
        className={css['goback__button']}
        type="button"
        onClick={goBackHandler}
      >
        <i className={css['left']}></i>Назад
      </button>
      <Link className={css['main-page__button']} to="/">
        Головна
      </Link>
      <i className={css['right']}></i>
      <div className={css['current-page__button']}>{currentPage}</div>
    </div>
  );
};

BreadCrumbs.propTypes = {
  currentPage: PropTypes.string,
};

export default BreadCrumbs;
