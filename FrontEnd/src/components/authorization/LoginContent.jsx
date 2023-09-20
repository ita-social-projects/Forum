import { useForm } from "react-hook-form";
import { useState, useEffect} from "react";
import axios from 'axios';
import validator from "validator";
import EyeVisible from "./EyeVisible";
import EyeInvisible from "./EyeInvisible";
import classes from "./LoginContent.module.css";

const LoginContent = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  };

  const errorMessageTemplates = {
    required: "Обов’язкове поле",
    email: "Формат електронної пошти некоректний",
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all"
  });

  const onSubmit = (value) => {

  };

  const { setErrorMessage } = props;

  useEffect(() => {
    let errorMessage = "";

    if (errors.email?.message && errors.password?.message) {
      if (errors.email.message === errors.password.message) {
        errorMessage = errors.email.message;
      } else {
        errorMessage = `${errors.email?.message || ""}\n${errors.password?.message || ""}`;
      }
    } else if (errors.email?.message) {
      errorMessage = errors.email.message;
    } else if (errors.password?.message) {
      errorMessage = errors.password.message;
    }

    setErrorMessage(errorMessage);
  }, [errors.email?.message, errors.password?.message, setErrorMessage]);

  return (
    <div className={classes["login-basic"]}>
      <div className={classes["login-header"]}>
        <p>Вхід на платформу</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={classes["login-content"]}>
          <div className={classes["login-content__items"]}>
            <div className={classes["login-content__item"]}>
              <label
                className={`${
                  errors.email && getValues("email").trim().length === 0
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
                  type="email"
                  autoComplete="username"
                  placeholder="Електронна пошта"
                  {...register("email", {
                    required: errorMessageTemplates.required,
                    validate: (value) => validator.isEmail(value) || errorMessageTemplates.email,
                  })}
                />
              </div>
              <span className={classes["error-message"]}>
                {errors.email && errors.email.message}
                {errors.required && errors.required.message}
                </span>
            </div>
            <div className={classes["login-content__item"]}>
              <label
                className={`${
                  errors.password && getValues("password").trim().length === 0
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Пароль"
                    {...register("password", {
                      required: errorMessageTemplates.required,
                    })}
                  />
                  <span className={classes["password-visibility"]} onClick={togglePassword}>
                    {!showPassword ? <EyeInvisible /> : <EyeVisible />}
                  </span>
                </div>
              </div>
              <span className={classes["error-message"]}>
                    {errors.password && errors.password.message}
                    {errors.required && errors.required.message}
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
              disabled={!isValid}
              type="submit"
              className={isValid ? classes["login-footer-buttons__signin"] : classes["login-footer-buttons__signin__disabled"]}
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
