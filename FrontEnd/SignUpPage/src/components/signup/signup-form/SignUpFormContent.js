import { useForm } from "react-hook-form";
import styles from "./SignUpFormContent.module.css";

export function SignUpFormContentComponent() {
  const errorMessageTemplates = {
    required: "Обов’язкове поле",
    email: "invalid email, should contain @ and .xx",
    password: "Пароль не відповідає вимогам",
    confirmPassword: "Паролі не збігаються",
    checkboxes: "Будь ласка, оберіть кого ви представляєте",
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/;

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

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
            <div className={styles["signup-form__field"]}>
              <input
                className={styles["signup-form__input"]}
                placeholder="Пароль"
                type="password"
                {...register("password", {
                  required: errorMessageTemplates.required,
                  pattern: {
                    value: passwordPattern,
                    message: errorMessageTemplates.password,
                  },
                })}
              />
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
            <div className={styles["signup-form__field"]}>
              <input
                className={styles["signup-form__input"]}
                placeholder="Пароль"
                type="password"
                {...register("confirmPassword", {
                  required: errorMessageTemplates.required,
                  validate: (value) =>
                    watch("password") !== value &&
                    errorMessageTemplates.confirmPassword,
                })}
              />
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
                        {...register("company", {
                          validate: (value) =>
                            getValues("startup") === !value ||
                            errorMessageTemplates.checkboxes,
                        })}
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
                        {...register("startup", {
                          validate: (value) =>
                            getValues("company") === !value ||
                            errorMessageTemplates.checkboxes,
                        })}
                      />
                    </div>
                    <label className={styles["representative__label"]}>
                      Стартап проект, який шукає інвестиції
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["representative__error"]}>
              {errors.company && errors.startup && errors.company.message}
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
