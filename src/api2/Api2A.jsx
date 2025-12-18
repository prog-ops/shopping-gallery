import { useEffect, useState } from "react";
import mockData from '../api2.json';
import {useQuery} from "@tanstack/react-query";
import { useStore } from "../store/store";
import Loading from "../components/Loading.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";

const ShortcutGrid = ({ data, onFilterClick, activeCategory }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="shortcut-container">
            {data.map((item, index) => {
                // Cek apakah item ini sedang aktif (dipilih)
                const isActive = activeCategory === item.title;

                return (
                    <div
                        key={item.mainShortcutId || index}
                        className={`shortcut-item ${isActive ? 'active' : ''}`}
                        // PENTING: Hapus href. Gunakan onClick saja.
                        onClick={() => onFilterClick(item.title)}
                        role="button" // Aksesibilitas: Beri tahu browser ini tombol
                        tabIndex={0}  // Aksesibilitas: Bisa difokuskan dengan tab
                    >
                        <div className="shortcut-icon-wrapper">
                            <ImageWithFallback
                                src={item.imageUrl}
                                alt={item.title}
                                className="shortcut-image"
                            />{/* Opsional: Tambahkan tanda silang kecil saat aktif agar user tahu bisa di-unselect */}
                            {isActive && <div className="active-indicator">✕</div>}
                        </div>
                        <span className="shortcut-title">{item.title}</span>
                    </div>
                );
            })}
        </div>
    );
};

const Api2AApp = () => {
    // Ambil juga selectedCategory untuk visual feedback (highlight)
    const { setCategory, resetCategory, selectedCategory } = useStore();

    const { data: shortcuts, isLoading } = useQuery({
        queryKey: ['shortcuts'],
        queryFn: async () => {
            const res = await fetch('https://api.testvalley.kr/main-shortcut/all');
            return res.json();
        }
    });

    // --- LOGIC TOGGLE (UNSELECT) ---
    const handleCategoryClick = (clickedTitle) => {
        if (selectedCategory === clickedTitle) {
            // Jika yang diklik adalah yang sedang aktif -> Matikan (Reset)
            resetCategory();
        } else {
            // Jika beda -> Aktifkan baru
            setCategory(clickedTitle);
        }
    };

    if (isLoading) return <Loading />;

    const finalShortcuts = shortcuts || mockData;

    return (
        <div className="section-container" style={{ marginTop: '1.5rem' }}>
            {/* Saat diklik, update state global via Zustand */}
            <ShortcutGrid
                data={finalShortcuts}
                activeCategory={selectedCategory} // Kirim status aktif
                onFilterClick={handleCategoryClick}
            />
        </div>
    );
};
export default Api2AApp;
