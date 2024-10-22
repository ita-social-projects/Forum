import { MAIN_PAGE_TEXT } from './Text';
import css from './mainPage.module.css';

function MainPage() {
    return (
        <div className={css['main-page-section']}>
            <h2>Вітаємо в панелі адміністратора.</h2>
            <p className={css['intro-text']}>Тут ви можете:</p>
            <div className={css['text-section']}>
                {MAIN_PAGE_TEXT.map((element) => (
                    <div key={element.title} className={css['text-item']}>
                        <p>
                            <b>{element.title}</b> {element.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
