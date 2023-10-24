import css from './BreadCrumbs.module.css';
import { Link, useNavigate } from 'react-router-dom';

const BreadCrumbs = (props) => {
    const navigate = useNavigate();

    const GoBackHandler = () => {
        navigate(-1);
    };
    return (
        <div className={css['content']}>
             <button className={css['goback__button']} type="button" onClick={GoBackHandler}><i className={css['left']}></i>Назад</button>
             <Link className={css['main-page__button']} to="/">Головна</Link>
             <i className={css['right']}></i>
             <div className={css['current-page__button']}>{props.currentPage}</div>
        </div>
    );
};

export default BreadCrumbs;