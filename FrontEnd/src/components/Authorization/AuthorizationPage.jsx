import Login from './/Login';
import classes from './AuthorizationPage.module.css';

const AuthorizationPage = () => {

  return (
    <div className={classes['auth-page']}>
      <img className={classes['frame-img-left']}
        src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_7x6.png`}
        alt="dots_7x6.png" />
      <img className={classes['frame-img-right']}
        src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_7x6.png`}
        alt="dots_7x6.png" />
      <Login />
    </div>
  );
};

export default AuthorizationPage;
