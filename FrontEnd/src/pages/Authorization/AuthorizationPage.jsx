import Login from './Login';
import classes from './AuthorizationPage.module.css';

const AuthorizationPage = () => {

  return (
    <div className={classes['auth-page']}>
      <Login />
    </div>
  );
};

export default AuthorizationPage;
