import React, { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { BsSearch } from 'react-icons/bs';
import './SearchBar.css';

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useStore();
    const [localQuery, setLocalQuery] = useState(searchQuery);

    // Debounce effect: tunggu user selesai ngetik 300ms baru update store utama
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchQuery(localQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [localQuery, setSearchQuery]);

    return (
        <div className="search-bar-container">
            <BsSearch className="search-icon" />
            <input 
                type="text" 
                className="search-input" 
                placeholder="Cari produk impianmu..." 
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
