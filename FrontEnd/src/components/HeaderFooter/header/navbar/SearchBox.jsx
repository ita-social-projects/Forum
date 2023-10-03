import css from "./SearchBox.module.css"
import icon_search from './search-icon.svg';

function SearchBox () {
    return (
        <div className={css["header-search-box"]}>
            <div className={css["header-search-form"]}>
                <input className={css["header-search-form__input"]} placeholder="Пошук"></input>
            </div>
            <span className={css["header-search-form__addon"]}><img src={icon_search} alt=""/></span>
        </div>
    );
}

export default SearchBox;
