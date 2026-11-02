import { useState, useEffect, useMemo, useRef } from 'react';
import { useStore } from '../store/store';
import { BsSearch } from 'react-icons/bs';
import { useQuery } from "@tanstack/react-query";
import './SearchBar.css';

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useStore();
    const [localQuery, setLocalQuery] = useState(searchQuery);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const wrapperRef = useRef(null);

    // Retrieve product data (instantaneous since it is already cached by React Query in CardApp)
    const { data: allData } = useQuery({ queryKey: ['products'], staleTime: Infinity });

    // Close suggestions dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Compute up to 5 unique top suggestions while typing
    const suggestions = useMemo(() => {
        if (!localQuery.trim() || !allData) {
            return [];
        }
        const q = localQuery.toLowerCase();

        return Array.from(new Set(
            allData
                .filter(p => p.name.toLowerCase().includes(q))
                .map(p => p.name)
        )).slice(0, 5);
    }, [localQuery, allData]);

    // Debounce effect: wait 300ms after the user stops typing before updating the main store
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
                    placeholder="Search for your dream products..."
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
