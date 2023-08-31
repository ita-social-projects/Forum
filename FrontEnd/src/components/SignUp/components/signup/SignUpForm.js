import styles from "./SignUpForm.module.css";
import { SignUpFormContentComponent } from "./signup-form/SignUpFormContent";
import { Link } from "react-router-dom"


export function SignUpFormComponent() {
  return (
    <div className={styles["form__container"]}>
      <div className={styles["form__header"]}>Реєстрація</div>
      <SignUpFormContentComponent />
      <div className={styles["form__footer"]}>
        <div className={styles["button-container"]}>
          <Link className={styles["main-page__button"]} to="/">
            Увійти
            </Link>
          <button
            form="signUpForm"
            className={styles["sign-up__button"]}
            type="submit"
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>
  );
}
