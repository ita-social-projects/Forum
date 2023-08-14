import css from "./Buttons.module.css"

function Buttons() {
    return (
        <div className={css["header-buttons-section"]}>
            <button className={css["header-login__button"]} type="button">Увійти</button>
            <button className={css["header-register__button"]} type="button">Зареєструватися</button>
        </div>
    );
};

export default Buttons;
