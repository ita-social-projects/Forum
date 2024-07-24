import Login from '../authorization/Login';
import classes from './AuthorizationPage.module.css';
import dots_decor from './dots_decor.svg';

const AuthorizationPage = () => {

  return (
    <div className={classes['auth-page']}>
      <img className={classes['frame-img-left']} src={dots_decor} alt="frame" />
      <img className={classes['frame-img-right']} src={dots_decor} alt="frame" />
      <Login />
    </div>
  );
};

export default AuthorizationPage;
