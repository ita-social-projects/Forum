import { useState } from "react";
import Login from "../authorization/Login";
import AlertMessage from "../authorization/AlertMessage";
import classes from "./MainPageRectangle.module.css";
import frame42 from "./frame42.png";

const MainPageRectangle = (props) => {
  const [errorText, setErrorText] = useState("");

  
  return (
    <div className={classes.rectangle}>
      {errorText && <AlertMessage errorMessage={errorText} setErrorMessage={setErrorText} />}
      <img className={classes["frame-img-left"]} src={frame42} alt="frame" />
      <img className={classes["frame-img-right"]} src={frame42} alt="frame" />
      <Login setErrorMessage={setErrorText} />
    </div>
  );
};

export default MainPageRectangle;
