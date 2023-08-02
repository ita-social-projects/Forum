import { useState } from "react";
import validator from "validator";

import EyeInvisible from "./EyeInvisible";
import RememberMeCheckbox from "./RememberMeCheckbox";
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
    } else if (
      enteredEmail.trim().length === 0 &&
      enteredPassword.trim().length === 0
    ) {
      errorMessage = emptyFieldErrorText;
      setError({
        errorType: "empty-fields",
        message: emptyFieldErrorText,
      });
    } else if (enteredEmail.trim().length === 0) {
      errorMessage = emptyFieldErrorText;
      setError({
        errorType: "empty-email-field",
        message: emptyFieldErrorText,
      });
    } else if (enteredPassword.trim().length === 0) {
      errorMessage = emptyFieldErrorText;
      setError({
        errorType: "empty-password-field",
        message: emptyFieldErrorText,
      });
    } else if (
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
                  error.errorType === "empty-email-field" ||
                  error.errorType === "empty-fields"
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
                <span className={classes["error-message"]}>
                  {error.errorType === "email" && error.message}
                </span>
              </div>
            </div>
            <div className={classes["login-content__item"]}>
              <label
                className={`${
                  error.errorType === "empty-password-field" ||
                  error.errorType === "empty-fields"
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
                  <button onClick={passwordVisisbilityHandler} type="button">
                    <EyeInvisible />
                  </button>
                </div>
                <span className={classes["error-message"]}>
                  {(error.errorType === "empty-password-field" ||
                    error.errorType === "empty-email-field" ||
                    error.errorType === "wrong-data" ||
                    error.errorType === "empty-fields") &&
                    error.message}
                </span>
              </div>
            </div>
          </div>
          <RememberMeCheckbox />
        </div>
        <div className={classes.loginfooter}>
          <div className={classes["loginfooter-buttons"]}>
            <button className={classes["loginfooter-buttons__main"]}>
              Головна
            </button>
            <button
              type="submit"
              className={classes["loginfooter-buttons__signin"]}
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
