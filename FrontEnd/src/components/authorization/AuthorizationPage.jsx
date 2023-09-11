import { useState } from "react";
import Login from "../authorization/Login";
import AlertMessage from "../authorization/AlertMessage";
import classes from "./AuthorizationPage.module.css";
import dots_decor from "./dots_decor.svg";

const AuthorizationPage = (props) => {
  const [errorText, setErrorText] = useState("");
  
  return (
    <div className={classes["auth-page"]}>
      {errorText && <AlertMessage errorMessage={errorText} setErrorMessage={setErrorText} />}
      <img className={classes["frame-img-left"]} src={dots_decor} alt="frame" />
      <img className={classes["frame-img-right"]} src={dots_decor} alt="frame" />
      <Login setErrorMessage={setErrorText} />
    </div>
  );
};

export default AuthorizationPage;
