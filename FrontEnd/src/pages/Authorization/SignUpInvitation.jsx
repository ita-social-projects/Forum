import { Link } from 'react-router-dom';
import classes from './SignUpInvitation.module.css';

const SignUpInvitation = () => {
    return (
        <div className={classes['signup-invitation']}>
            <p>Вперше на нашому сайті?</p>
            <Link to="/sign-up">Зареєструйтесь</Link>
        </div>
    );
};

export default SignUpInvitation;
