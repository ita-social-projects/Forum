import LoginContent from "./LoginContent";
import SignUpInvitation from "./SignUpInvitation";
import classes from "./Login.module.css"

const Login = (props) => {
  console.log("login", props)
  return <div className={classes.login}>
    <LoginContent setErrorMessage={props.setErrorMessage} />
    <SignUpInvitation />
  </div>;
};

export default Login;
