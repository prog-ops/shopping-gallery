import { useEffect, useState } from "react";
import mockData from '../api2.json';
import {useQuery} from "@tanstack/react-query";
import { useStore } from "../store/store";
import Loading from "../components/Loading.jsx";

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
    // Panggil action Zustand
    const { setCategory } = useStore();

    const { data: shortcuts, isLoading } = useQuery({
        queryKey: ['shortcuts'],
        queryFn: async () => {
            const res = await fetch('https://api.testvalley.kr/main-shortcut/all');
            return res.json();
        }
    });

    if (isLoading) return <Loading />;

    const finalShortcuts = shortcuts || mockData;

    return (
        <div className="section-container" style={{ marginTop: '1.5rem' }}>
            {/* Saat diklik, update state global via Zustand */}
            <ShortcutGrid
                data={finalShortcuts}
                onFilterClick={(title) => setCategory(title)}
            />
        </div>
    );
};
export default Api2AApp;
