import LoginPage from './LoginPage';
import SignUpInvitation from './SignUpInvitation';
import classes from './Login.module.css';

const Login = (props) => {
  return <div className={classes.login}>
    <LoginPage setErrorMessage={props.setErrorMessage} />
    <SignUpInvitation />
  </div>;
};

export default Login;
