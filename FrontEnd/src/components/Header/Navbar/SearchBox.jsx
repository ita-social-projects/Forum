import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Input} from 'antd';
import {CloseOutlined, SearchOutlined} from '@ant-design/icons';
import css from './SearchBox.module.css';

function SearchBox() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const searchPage = 'search';

  const handleSearch = () => {
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
            <Input
                className={css['header-search-form__input']}
                placeholder="Пошук"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
               <Button
                id={'closeButton'}
                icon={<CloseOutlined/>}
                onClick={handleClear}
                className={css['header-search-form__addon']}
                style={{ color: '#000' }}
            />
            )}
            <Button
                icon={<SearchOutlined/>}
                onClick={handleSearch}
                className={css['header-search-form__addon']}
                style={{ color: '#000' }}
            />
          </div>
      </div>

  );
}

export default SearchBox;
