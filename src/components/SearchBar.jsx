import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/store';
import { BsSearch } from 'react-icons/bs';
import { useQuery } from "@tanstack/react-query";
import './SearchBar.css';

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useStore();
    const [localQuery, setLocalQuery] = useState(searchQuery);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const wrapperRef = useRef(null);

    // Ambil data produk (ini akan langsung instan karena sudah di-cache oleh React Query di CardApp)
    const { data: allData } = useQuery({ queryKey: ['products'], staleTime: Infinity });

    // Handle klik di luar untuk menutup suggestions
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    // Update suggestions saat ngetik
    useEffect(() => {
        if (!localQuery.trim() || !allData) {
            setSuggestions([]);
            return;
        }
        const q = localQuery.toLowerCase();
        
        // Cari max 5 saran teratas (tanpa duplikat)
        const matches = Array.from(new Set(
            allData
                .filter(p => p.name.toLowerCase().includes(q))
                .map(p => p.name)
        )).slice(0, 5);
        
        setSuggestions(matches);
    }, [localQuery, allData]);

    // Debounce effect: tunggu user selesai ngetik 300ms baru update store utama
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchQuery(localQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [localQuery, setSearchQuery]);

    const handleSuggestionClick = (suggestion) => {
        setLocalQuery(suggestion);
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="search-bar-wrapper" ref={wrapperRef}>
            <div className="search-bar-container">
                <BsSearch className="search-icon" />
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Cari produk impianmu..." 
                    value={localQuery}
                    onChange={(e) => {
                        setLocalQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="search-suggestions">
                    {suggestions.map((suggestion, idx) => (
                        <div 
                            key={idx} 
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <BsSearch className="suggestion-icon" />
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
