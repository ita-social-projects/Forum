import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './SearchBox.module.css';

function SearchBox() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const searchPage = 'search';

  const handleSearch = (searchTerm, searchPage) => {
    if (searchTerm.trim() !== '') {
      navigate(`/${searchPage}/?name=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className={css['header-search-box']}>
      <div className={css['header-search-form']}>
        <input
          className={css['header-search-form__input']}
          id="search_box"
          value={searchTerm}
          type="text"
          placeholder="Пошук"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(searchTerm, searchPage);
            }
          }}
        />
        {searchTerm && (
          <button
            className={css['clear-button']}
            onClick={handleClear}
          >
            &times;
          </button>
        )}
      </div>
      <button
        onClick={() => handleSearch(searchTerm, searchPage)}
        className={css['header-search-form__addon']}
        disabled={!searchTerm.trim()}
      >
        <img src={`${process.env.REACT_APP_PUBLIC_URL}/svg/search-icon.svg`} alt="Search" />
      </button>
    </div>
  );
}

export default SearchBox;
