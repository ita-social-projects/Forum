import LoginPage from './LoginPage';
import SignUpInvitation from './SignUpInvitation';
import classes from './Login.module.css';

const Login = () => {
  return <div className={classes.login}>
    <LoginPage />
    <SignUpInvitation />
  </div>;
};

export default Login;
