import { useState } from 'react';
import icon_search from './search-icon.svg';
import { useNavigate } from 'react-router-dom';
import css from './SearchBox.module.css';

function SearchBox() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const searchPage = 'search';

  const handleSearch = (searchTerm, searchPage) => {
    if (searchTerm.trim() !== '') {
      navigate(`/${searchPage}/?name=${searchTerm}`);
    }
  };
  return (
    <div className={css['header-search-box']}>
      <div className={css['header-search-form']}>
        <input
          className={css['header-search-form__input']}
          value={searchTerm}
          type="text"
          placeholder="Пошук"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        onClick={() => handleSearch(searchTerm, searchPage)}
        className={css['header-search-form__addon']}
        disabled={!searchTerm.trim()}
      >
        <img src={icon_search} alt="" />
      </button>
    </div>
  );
}

export default SearchBox;
