import css from "./ErrorPage.module.css";
import { Button, ConfigProvider } from "antd";

export default function ErrorPage() {
  return (
    <div className={css.page}>
      <div className={css.container}>
        <div className={css.text404}>404</div>
        <div className={css.block}>
          <div className={css.explanation}>
            <p className={css.main}>Щось пішло не так</p>
            <p className={css.details}>
              Схоже, це неправильна адреса, ця сторінка видалена, перейменована
              або тимчасово недоступна.
            </p>
          </div>
          <Button>
            <a href="/">Повернутися на Головну</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
