import css from "./SearchBox.module.css"
import icon_search from './search-icon.svg';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox () {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() !== ''){
            navigate(`/search/?search_field=${searchTerm}`);
        }
    }; 

    return (
        <div className={css["header-search-box"]}>
            <div className={css["header-search-form"]}>
                <input className={css["header-search-form__input"]} value={searchTerm} type="text" placeholder="Пошук" onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div>
            <button onClick={() => handleSearch(searchTerm)} className={css["header-search-form__addon"]}>
                <img src={icon_search} alt=""/>
            </button>
        </div>
    );
};

export default SearchBox;