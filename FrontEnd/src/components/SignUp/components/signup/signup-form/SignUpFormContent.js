import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import EyeInvisible from "../../../../authorization/EyeInvisible";
import EyeVisible from "../../../../authorization/EyeVisible";
import styles from "./SignUpFormContent.module.css";


export function SignUpFormContentComponent(props) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const togglePassword = () => {
    setShowPassword(!showPassword)
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  };
  
  const errorMessageTemplates = {
    required: "Обов’язкове поле",
    email: "Email не відповідає вимогам",
    password: "Пароль не відповідає вимогам",
    confirmPassword: "Паролі не збігаються",
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "all"
  });

  const [isChecked, setIsChecked] = useState({
    startup: false,
    company: false,
  });

  const onChangeCheckbox = (event) => {
    if (event.target.name === "startup") {
      setIsChecked({
        startup: true,
        company: false,
      });
    } else if (event.target.name === "company") {
      setIsChecked({
        startup: false,
        company: true,
      });
    }
  };

  const { setIsValid } = props;

  useEffect(() => {
    const companyOrStartup = isChecked.company || isChecked.startup;
    const formIsValid = companyOrStartup && isValid
    setIsValid(formIsValid);
    }, [isValid, setIsValid, isChecked.company, isChecked.startup])

  const onSubmit = (event) => {
    // TODO - add submission
  };

  return (
    <div className={styles["signup-form"]}>
      <form
        id="signUpForm"
        className={styles["signup-form__container"]}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <div className={styles["signup-form__row"]}>
          <div className={styles["signup-form__column"]}>
            <div className={styles["signup-form__label"]}>
              <label className={styles["signup-form__label--required"]}>
                *
              </label>
              <label className={styles["signup-form__label--text"]}>
                Електронна пошта
              </label>
            </div>
            <div className={styles["signup-form__field"]}>
              <input
                className={styles["signup-form__input"]}
                placeholder="Електронна пошта"
                type="email"
                {...register("email", {
                  required: errorMessageTemplates.required,
                  pattern: {
                    value: emailPattern,
                    message: errorMessageTemplates.email,
                  },
                })}
              />
            </div>
            <div className={styles["signup-form__error"]}>
              {errors.email && errors.email.message}
            </div>
          </div>
          <div className={styles["signup-form__column"]}>
            <div className={styles["signup-form__label"]}>
              <label className={styles["signup-form__label--required"]}>
                *
              </label>
              <label className={styles["signup-form__label--text"]}>
                Назва компанії
              </label>
            </div>
            <div className={styles["signup-form__field"]}>
              <input
                className={styles["signup-form__input"]}
                type="text"
                placeholder="Назва компанії"
                {...register("companyName", {
                  required: errorMessageTemplates.required,
                })}
              />
            </div>
            <div className={styles["signup-form__error"]}>
              {errors.companyName && errors.companyName.message}
            </div>
          </div>
        </div>
        <div className={styles["signup-form__row"]}>
          <div className={styles["signup-form__column"]}>
            <div className={styles["signup-form__label"]}>
              <label className={styles["signup-form__label--required"]}>
                *
              </label>
              <div className={styles["signup-form__label--password"]}>
                <label>Пароль</label>
                <label className={styles["signup-form__label--hint"]}>
                  (Повинен містити A-Z, a-z, 0-9)
                </label>
              </div>
            </div>
            <div className={styles["signup-form__field__password"]}>
              <input
                className={styles["signup-form__input__password"]}
                placeholder="Пароль"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: errorMessageTemplates.required,
                  pattern: {
                    value: passwordPattern,
                    message: errorMessageTemplates.password,
                  },
                })}
              />
              <span className={styles["password-visibility"]} onClick={togglePassword}>
                {!showPassword ? <EyeInvisible /> : <EyeVisible />}
              </span>
            </div>
            <div className={styles["signup-form__error"]}>
              {errors.password && errors.password.message}
            </div>
          </div>
          <div className={styles["signup-form__column"]}>
            <div className={styles["signup-form__label"]}>
              <label className={styles["signup-form__label--required"]}>
                *
              </label>
              <div className={styles["signup-form__label--password"]}>
                <label className={styles["signup-form__label--text"]}>
                  Повторіть пароль
                </label>
                <label className={styles["signup-form__label--hint"]}>
                  (Повинен містити A-Z, a-z, 0-9)
                </label>
              </div>
            </div>
            <div className={styles["signup-form__field__password"]}>
              <input
                className={styles["signup-form__input__password"]}
                placeholder="Пароль"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: errorMessageTemplates.required,
                  validate: (value) =>
                    watch("password") !== value ?
                    errorMessageTemplates.confirmPassword : null,
                })}
              />
              <span className={styles["password-visibility"]} onClick={toggleConfirmPassword}>
                {!showConfirmPassword ? <EyeInvisible /> : <EyeVisible />}
              </span>
            </div>
            <div className={styles["signup-form__error"]}>
              {errors.confirmPassword && errors.confirmPassword.message}
            </div>
          </div>
        </div>
        <div className={styles["signup-form__row"]}>
          <div className={styles["signup-form__column"]}>
            <div className={styles["signup-form__label"]}>
              <label className={styles["signup-form__label--required"]}>
                *
              </label>
              <label className={styles["signup-form__label--text"]}>
                Прізвище
              </label>
            </div>
            <div className={styles["signup-form__field"]}>
              <input
                className={styles["signup-form__input"]}
                type="text"
                placeholder="Прізвище"
                {...register("surname", {
                  required: errorMessageTemplates.required,
                })}
              />
            </div>
            <div className={styles["signup-form__error"]}>
              {errors.surname && errors.surname.message}
            </div>
          </div>
          <div className={styles["signup-form__column"]}>
            <div className={styles["signup-form__label"]}>
              <label className={styles["signup-form__label--required"]}>
                *
              </label>
              <label className={styles["signup-form__label--text"]}>Ім‘я</label>
            </div>
            <div className={styles["signup-form__field"]}>
              <input
                className={styles["signup-form__input"]}
                type="text"
                placeholder="Ім‘я"
                {...register("name", {
                  required: errorMessageTemplates.required,
                })}
              />
            </div>
            <div className={styles["signup-form__error"]}>
              {errors.name && errors.name.message}
            </div>
          </div>
        </div>
        <div className={styles["signup-form__checkboxes-container"]}>
          <div className={styles["representative"]}>
            <div className={styles["representative__title"]}>
              <label className={styles["signup-form__label--required"]}>
                *
              </label>
              <label>Кого ви представляєте?</label>
            </div>
            <div className={styles["representative__container"]}>
              <div className={styles["representative__content"]}>
                <div className={styles["representative__column"]}>
                  <div className={styles["representative__option"]}>
                    <div
                      className={styles["representative__checkbox-container"]}
                    >
                      <input
                        type="checkbox"
                        name="company"
                        onChange={onChangeCheckbox}
                        checked={isChecked.company}
                      />
                    </div>
                    <label className={styles["representative__label"]}>
                      Зареєстрована компанія
                    </label>
                  </div>
                </div>
                <div className={styles["representative__column"]}>
                  <div className={styles["representative__option"]}>
                    <div
                      className={styles["representative__checkbox-container"]}
                    >
                      <input
                        type="checkbox"
                        name="startup"
                        onChange={onChangeCheckbox}
                        checked={isChecked.startup}
                      />
                    </div>
                    <label className={styles["representative__label"]}>
                      Стартап проект, який шукає інвестиції
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["signup-form__checkboxes-container--rules"]}>
            <div className={styles["rules__container"]}>
              <label className={styles["signup-form__label--required"]}>
                *
              </label>
              <div className={styles["rules__line"]}>
                <input
                  type="checkbox"
                  className={styles["rules__checkbox"]}
                  {...register("rulesAgreement", {
                    required: errorMessageTemplates.required,
                  })}
                />
                <label className={styles["rules__line--text"]}>
                  Погоджуюсь з{" "}
                  <a href="#" className={styles["rules__line--link"]}>
                    правилами використання
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
