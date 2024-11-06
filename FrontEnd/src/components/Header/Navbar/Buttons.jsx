import css from './Buttons.module.css';
import { Link } from 'react-router-dom';

function Buttons({adminPage}) {
    return (
        <div className={css['header-buttons-section']}>
            <Link className={css['header-login__button']} to="/login">Увійти</Link>
            {!adminPage && <Link className={css['header-register__button']} to="/sign-up">Зареєструватися</Link>}
        </div>
    );
}

export default Buttons;
