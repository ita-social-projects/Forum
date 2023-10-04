import { Link } from "react-router-dom"
import styles from "./SignUpModalPage.module.css";
import DotDecorComponent from "../UI/dotDecor/DotDecor";

export function SignUpModalPage() {
  return (
    <div className={styles["modal"]}>
      <div className={styles["modal__body"]}>
        <DotDecorComponent position={"up-right"} />
        <div className={styles["container-modal"]}>
            <div className={styles["modal__header"]}>Реєстрація майже завершена</div>
            <div className={styles["modal__footer"]}>
                <p>
                  На зазначену Вами електронну пошту відправлено листа. <br />
                  Будь ласка перейдіть за посиланням з листа для підтвердження вказаної електронної адреси. <br />
                  На цьому реєстрацію завершено. <br />
                  <div className={styles["resend-line"]}>
                    <a href="/sign-up/resend-activation" className={styles["resend-line__link"]}>
                      Не отримали лист?
                    </a>
                  </div>
                </p>
            </div>
            <div className={styles["modal__footer"]}>
              <div className={styles["button-container"]}>
                <Link className={styles["signup-page__button"]} to="/login">
                  Закрити
                </Link>
              </div>
            </div>
        </div>
        <DotDecorComponent position={"down-left"} />
      </div>
    </div>
  );
}
