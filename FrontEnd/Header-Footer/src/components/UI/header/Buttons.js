import css from "./Buttons.module.css"

function Buttons() {
    return (
        <div className={css["header-buttons-section"]}>
            <button className={css["header-login-button"]}>Увійти</button>
            <button className={css["header-register-button"]}>Зареєструватися</button>
        </div>
    );
}

export default Buttons