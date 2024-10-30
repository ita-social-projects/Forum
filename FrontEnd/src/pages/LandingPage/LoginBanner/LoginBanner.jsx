import css from './LoginBanner.module.css';
import { Link } from 'react-router-dom';

const MainLoginBanner = () => {
  return (
    <div className={css['login-banner-group']}>
      <div className={css['login-banner-group__content']}>
        <h2 className={css['login-banner-group__text']}>
          Майданчик для тих, хто втілює свої ідеї в життя
        </h2>
        <div className={css['login-banner-group__button']}>
          <Link
            className={css['login-banner-group__button-text']}
            to="/sign-up"
            alt="долучитись до спільноти"
          >
            Долучитися
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainLoginBanner;
