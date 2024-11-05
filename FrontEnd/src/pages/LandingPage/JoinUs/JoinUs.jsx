import css from './JoinUs.module.css';
import { Link } from 'react-router-dom';

const JoinUs = () => {
  return (
    <div className={css['join-us']}>
      <div className={css['join-us__content']}>
        <h2 className={css['join-us__text']}>
          Майданчик для тих, хто втілює свої ідеї в життя
        </h2>
        <div className={css['join-us__button']}>
          <Link
            className={css['join-us__button-text']}
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

export default JoinUs;
