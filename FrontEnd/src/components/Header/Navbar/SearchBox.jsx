import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Input} from 'antd';
import {CloseOutlined, SearchOutlined} from '@ant-design/icons';
import css from './SearchBox.module.scss';

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

  const keyDownFunction = (e) => {
      if (e.key === 'Enter' ) {
        handleSearch();
      }
  };

  const handleClear = () => {
    setSearchTerm('');
  };
  return (
      <div className={css['headerSearchBox']}>
          <div className={css['headerSearchForm']}>
            <Input
                className={css['headerSearchFormInput']}
                placeholder="Пошук"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={keyDownFunction}
            />
            {searchTerm && (
               <Button
                icon={<CloseOutlined/>}
                onClick={handleClear}
                className={css['headerSearchFormAddon']}
            />
            )}
            <Button
                icon={<SearchOutlined/>}
                onClick={handleSearch}
                className={css['headerSearchFormAddon']}
            />
          </div>
      </div>

  );
}

export default SearchBox;