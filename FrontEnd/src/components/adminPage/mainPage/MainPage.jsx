import { MAIN_PAGE_TEXT } from './Text';
import css from './mainPage.module.css';

function MainPage() {
    return (
        <div className={css['main-page-section']}>
            <h2>Welcome to the admin panel</h2>
            <p>Here, you can:</p>
            <br />
            {MAIN_PAGE_TEXT.map((element) => (
                <div key={element.title}>
                    <p>
                        <b>{element.title}</b> {element.text}
                    </p>
                    <br />
                </div>
            ))}
        </div>
    );
}

export default MainPage;
