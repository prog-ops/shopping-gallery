import React from 'react';

const HighlightText = ({ text, highlight }) => {
    // Jika tidak ada kata kunci pencarian, kembalikan text aslinya
    if (!highlight || !highlight.trim()) return <>{text}</>;
    
    // Kita escape karakter khusus agar tidak merusak Regex (jika user mengetik karakter aneh)
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeHighlight = escapeRegExp(highlight.trim());
    
    // Pecah text berdasarkan highlight (case-insensitive)
    const regex = new RegExp(`(${safeHighlight})`, 'gi');
    const parts = text.split(regex);
    
    return (
        <span>
            {parts.map((part, i) => 
                regex.test(part) ? (
                    <mark key={i} style={{ 
                        backgroundColor: '#ffeb3b', 
                        color: '#000', 
                        padding: '0 2px', 
                        borderRadius: '3px',
                        fontWeight: 'bold'
                    }}>
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

export default HighlightText;
