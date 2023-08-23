import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    }

    return (
        <div>
            <input type="text" placeholder="Введіть назву компанії" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={handleSearch}>Знайти</button>
        </div>
    );
}

export default SearchBar;