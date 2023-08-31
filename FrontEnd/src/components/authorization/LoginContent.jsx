import { useState } from "react";
import validator from "validator";
import EyeVisible from "./EyeVisible";
import EyeInvisible from "./EyeInvisible";
import classes from "./LoginContent.module.css";

const LoginContent = (props) => {
  const [typePassword, setTypePassword] = useState("password")
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState("");

  const passwordVisisbilityHandler = () => {
    if (typePassword === "password") {
      setTypePassword("text")
    } else setTypePassword("password")
  };

  const userValidationHandler = (event) => {
    event.preventDefault();

    const emailErrorText = "Формат електронної пошти некоректний";
    const unspecifiedErrorText =
      "Електронна пошта чи пароль вказані некоректно";
    const emptyFieldErrorText = "Обов'язкове поле";

    let errorMessage = "";

    if (!validator.isEmail(enteredEmail) && enteredEmail.trim().length > 0) {
      errorMessage = emailErrorText;
      setError({
        errorType: "email",
        message: emailErrorText,
      });
      setEnteredEmail("");
    } else if (enteredEmail.trim().length === 0) {
      errorMessage = emptyFieldErrorText;
      setError({
        errorType: "required",
        message: emptyFieldErrorText,
      });
    } else if (enteredPassword.trim().length === 0) {
      errorMessage = emptyFieldErrorText;
      setError({
        errorType: "required",
        message: emptyFieldErrorText,
      });
    } else if (
      // fake validation to show functionality
      enteredEmail.trim().length < 5 ||
      enteredPassword.trim().length < 8
    ) {
      errorMessage = unspecifiedErrorText;
      setError({
        errorType: "wrong-data",
        message: unspecifiedErrorText,
      });
      setEnteredEmail("");
      setEnteredPassword("");
    }
    props.setErrorMessage(errorMessage);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const errorHandler = () => {
    setError("");
  };

  return (
    <div className={classes["login-basic"]} onClick={errorHandler}>
      <div className={classes["login-header"]}>
        <p>Вхід на платформу</p>
      </div>
      <form onSubmit={userValidationHandler}>
        <div className={classes["login-content"]}>
          <div className={classes["login-content__items"]}>
            <div className={classes["login-content__item"]}>
              <label
                className={`${
                  error.errorType === "required" && enteredEmail === ""
                    ? classes["error-dot"]
                    : ""
                }`}
                htmlFor="email"
              >
                Електронна пошта
              </label>
              <div className={classes["login-content__email"]}>
                <input
                  id="email"
                  type="text"
                  autoComplete="username"
                  placeholder="Електронна пошта"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                />
              </div>
              <span className={classes["error-message"]}>
                {error.errorType === "email" && error.message}
                {error.errorType === "required" && enteredEmail === "" && error.message}
                </span>
            </div>
            <div className={classes["login-content__item"]}>
              <label
                className={`${
                  error.errorType === "required" && enteredPassword === ""
                    ? classes["error-dot"]
                    : ""
                }`}
                htmlFor="password"
              >
                Пароль
              </label>
              <div className={classes["login-content__password"]}>
                <div className={classes["login-content__password__wrapper"]}>
                  <input
                    id="password"
                    type={typePassword}
                    autoComplete="current-password"
                    placeholder="Пароль"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                  />
                  <span className={classes["password-visibility"]} onClick={passwordVisisbilityHandler}>
                    {typePassword === "password" ? <EyeInvisible /> : <EyeVisible />}
                  </span>
                </div>
              </div>
              <span className={classes["error-message"]}>
                    {error.errorType === "wrong-data" && error.message}
                    {error.errorType === "required" && enteredPassword === "" && error.message}
              </span>
            </div>
            <a href="/" className={classes["forget-password"]}>Забули пароль?</a>
          </div>
          
        </div>
        <div className={classes["login-footer"]}>
          <div className={classes["login-footer-buttons"]}>
          <a href="/">
              <button
                type="button"
                className={classes["login-footer-buttons__main"]}
              >
                Головна
              </button>
            </a>
            <button
              type="submit"
              className={classes["login-footer-buttons__signin"]}
            >
              Увійти
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginContent;
