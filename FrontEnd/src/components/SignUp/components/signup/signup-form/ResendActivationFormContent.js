import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate  } from 'react-router-dom';

import axios from "axios";
import styles from "./ResendActivationFormContent.module.css";

export function ResendActivationFormContentComponent(props) {
  const navigate = useNavigate();

  const errorMessageTemplates = {
    required: "Обов’язкове поле",
    email: "Email не відповідає вимогам",
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  const { setIsValid } = props;

  useEffect(() => {
    const formIsValid = isValid;
    setIsValid(formIsValid);
  }, [isValid, setIsValid]);

  const onSubmit = (event) => {
    const dataToSend = {
      email: getValues("email"),
    };

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/resend_activation/`,
      withCredentials: false,
      data: dataToSend
    }).then(res => console.log(res.data)).catch(error => console.log(error))
    console.log(process.env.REACT_APP_BASE_API_URL)
    navigate("/login");
  };

  return (
    <div className={styles["resend-activation-form"]}>
      <form
        id="signUpForm"
        className={styles["resend-activation-form__container"]}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <div className={styles["resend-activation-form__row"]}>
          <div className={styles["resend-activation-form__column"]}>
            <div className={styles["resend-activation-form__label"]}>
              <label className={styles["resend-activation-form__label--required"]}>
                *
              </label>
              <label className={styles["resend-activation-form__label--text"]}>
                Електронна пошта
              </label>
            </div>
            <div className={styles["resend-activation-form__field"]}>
              <input
                className={styles["resend-activation-form__input"]}
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
            <div className={styles["resend-activation-form__error"]}>
              {errors.email && errors.email.message}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
