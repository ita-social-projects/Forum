import { Link } from 'react-router-dom';
import css from './ErrorPage404.module.css';
import { Button } from 'antd';

export default function ErrorPage404() {
  return (
    <div className={css.ErrorPage404__page}>
      <div className={css.ErrorPage404__container}>
        <div className={css.ErrorPage404__text404}>404</div>
        <div className={css.ErrorPage404__block}>
          <div className={css.ErrorPage404__explanation}>
            <p className={css['ErrorPage404__main-text']}>Щось пішло не так</p>
            <p className={css.ErrorPage404__details}>
              Схоже, це неправильна адреса, ця сторінка видалена, перейменована
              або тимчасово недоступна.
            </p>
          </div>
          <Button>
            <Link className={css['ErrorPage404__button-text']} to="/">Повернутися на Головну</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}