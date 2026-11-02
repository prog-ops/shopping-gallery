const HighlightText = ({ text, highlight }) => {
    // If there is no search keyword, return the original text
    if (!highlight || !highlight.trim()) return <>{text}</>;

    const trimmedHighlight = highlight.trim();

    // Escape special characters so user input does not break the RegExp
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeHighlight = escapeRegExp(trimmedHighlight);

    // Split text based on the highlighted keyword (case-insensitive)
    const regex = new RegExp(`(${safeHighlight})`, 'gi');
    const parts = text.split(regex);

    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === trimmedHighlight.toLowerCase() ? (
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
