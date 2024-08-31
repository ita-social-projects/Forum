import { Link } from 'react-router-dom';
import css from './ErrorPage404.module.css';
import { Button } from 'antd';

export default function ErrorPage404() {
  return (
    <div className={css.page}>
      <div className={css.container}>
        <div className={css.text404}>404</div>
        <div className={css.block}>
          <div className={css.explanation}>
            <p className={css['main-text']}>Щось пішло не так</p>
            <p className={css.details}>
              Схоже, це неправильна адреса, ця сторінка видалена, перейменована
              або тимчасово недоступна.
            </p>
          </div>
          <Button>
            <Link className={css['button-text']} to="/">Повернутися на Головну</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}