import React, { useState } from 'react';
import styles from './Search.module.css';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className={styles.searchContainer}> 
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleChange} 
                placeholder="Search..." 
                className={styles.searchInput}
            />
        </div>
    );
};

export default Search;