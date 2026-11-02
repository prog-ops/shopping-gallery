import mockData from '../api2.json';
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../store/store";
import Loading from "../components/Loading.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";

const ShortcutGrid = ({ data, onFilterClick, activeCategory }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="shortcut-container">
            {data.map((item, index) => {
                // Check whether this category item is currently active (selected)
                const isActive = activeCategory === item.title;

                return (
                    <div
                        key={item.mainShortcutId || index}
                        className={`shortcut-item ${isActive ? 'active' : ''}`}
                        onClick={() => onFilterClick(item.title)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onFilterClick(item.title);
                            }
                        }}
                        role="button" // Accessibility: announce this element as a button
                        tabIndex={0}  // Accessibility: make focusable via keyboard Tab
                    >
                        <div className="shortcut-icon-wrapper">
                            <ImageWithFallback
                                src={item.imageUrl}
                                alt={item.title}
                                className="shortcut-image"
                            />
                            {/* Show a small close indicator when active so users know it can be deselected */}
                            {isActive && <div className="active-indicator">✕</div>}
                        </div>
                        <span className="shortcut-title">{item.title}</span>
                    </div>
                );
            })}
        </div>
    );
};

const CategoryApp = () => {
    // Retrieve selectedCategory as well for active visual feedback (highlight)
    const { setCategory, resetCategory, selectedCategory } = useStore();

    const { data: shortcuts, isLoading } = useQuery({
        queryKey: ['shortcuts'],
        queryFn: async () => {
            const res = await fetch('https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json');
            const data = await res.json();

            // Map products to shortcut format based on unique categories
            const categoriesMap = new Map();
            data.forEach(item => {
                if (!categoriesMap.has(item.category)) {
                    categoriesMap.set(item.category, {
                        mainShortcutId: item.category,
                        title: item.category,
                        imageUrl: item.image
                    });
                }
            });
            return Array.from(categoriesMap.values());
        }
    });

    // --- TOGGLE LOGIC (DESELECT) ---
    const handleCategoryClick = (clickedTitle) => {
        if (selectedCategory === clickedTitle) {
            // If clicking the currently active category -> deactivate (reset)
            resetCategory();
        } else {
            // If clicking a different category -> activate it
            setCategory(clickedTitle);
        }
    };

    if (isLoading) return <Loading />;

    const finalShortcuts = shortcuts || mockData;

    return (
        <div className="section-container" style={{ marginTop: '1.5rem' }}>
            {/* Update global filter state via Zustand on click */}
            <ShortcutGrid
                data={finalShortcuts}
                activeCategory={selectedCategory} // Pass active category status
                onFilterClick={handleCategoryClick}
            />
        </div>
    );
};

export default CategoryApp;
