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
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "#1F9A7C",
                  colorPrimaryHover: "#0b6c61",
                  fontWeight: 600,
                  contentFontSize: 16,
                  fontFamilyCode: "Inter",
                },
              },
            }}
          >
            <Button>
              <a href="/">Повернутися на Головну</a>
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}