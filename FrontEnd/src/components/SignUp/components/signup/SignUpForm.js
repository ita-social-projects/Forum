import styles from "./SignUpForm.module.css";
import { SignUpFormContentComponent } from "./signup-form/SignUpFormContent";
import { useState } from "react";

export function SignUpFormComponent() {
  const [isValid, setIsValid] = useState(false)
  return (
    <div className={styles["form__container"]}>
      <div className={styles["form__header"]}>Реєстрація</div>
      <SignUpFormContentComponent setIsValid={setIsValid}/>
      <div className={styles["form__footer"]}>
        <div className={styles["button-container"]}>
          <button className={styles["main-page__button"]} type="button">
            Головна
          </button>
          <button
            disabled={!isValid}
            form="signUpForm"
            className={isValid ? styles["sign-up__button"] : styles["sign-up__button__disabled"]}
            type="submit"
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>
  );
}
