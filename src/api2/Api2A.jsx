import { useEffect, useState } from "react";
import mockData from '../api2.json';

const ShortcutGrid = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="shortcut-container">
            {data.map((item, index) => (
                <a
                    key={item.mainShortcutId || index}
                    href={item.linkUrl} // Asumsikan ada linkUrl
                    className="shortcut-item"
                >
                    <div className="shortcut-icon-wrapper">
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="shortcut-image"
                            loading="lazy"
                        />
                    </div>
                    <span className="shortcut-title">{item.title}</span>
                </a>
            ))}
        </div>
    );
};

const Api2AApp = () => {
    const [shortcuts, setShortcuts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.testvalley.kr/main-shortcut/all')
            .then(res => res.json())
            .then(data => setShortcuts(data))
            .catch(err => {
                console.warn('API Error, using mock:', err);
                setShortcuts(mockData);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-skeleton-sm"></div>;
    if (!shortcuts.length) return null;

    return (
        // Gunakan section-container yang kita buat sebelumnya agar rapi
        <div className="section-container" style={{ marginTop: '1.5rem' }}>
            <ShortcutGrid data={shortcuts} />
        </div>
    );
};

export default Api2AApp;
