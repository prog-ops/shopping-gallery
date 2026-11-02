import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../store/store";
import Loading from "../components/Loading.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import SearchBar from "../components/SearchBar.jsx";
import HighlightText from "../components/HighlightText.jsx";

// Product Card Component
const ProductCard = ({ item, searchQuery }) => {
    const { addToCart, favorites, toggleFavorite, setSelectedProduct } = useStore();
    const isFavorite = favorites.some(fav => fav.id === item.id);
    const [animating, setAnimating] = useState('none');

    const mediaUri = item.image;
    const title = item.name;
    const price = item.priceCents;
    const rating = item.rating;

    return (
        <div
            className={`product-card ${animating === 'cart' ? 'sliding-to-cart' : ''} ${animating === 'fav' ? 'sliding-to-fav' : ''}`}
            onClick={() => setSelectedProduct(item)}
        >
            <div className="card-image-wrapper">
                <ImageWithFallback
                    src={mediaUri}
                    alt={title}
                />

                <button
                    className="fav-toggle-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                        setAnimating('fav');
                        setTimeout(() => setAnimating('none'), 500);
                    }}
                >
                    {isFavorite ? <BsHeartFill color="#ff4757" /> : <BsHeart />}
                </button>

                {rating && rating.stars && (
                    <span className="discount-badge" style={{ backgroundColor: '#ffc107', color: '#000' }}>
                        ★ {rating.stars}
                    </span>
                )}
            </div>

            <div className="card-info">
                <h4 className="card-title">
                    <HighlightText text={title} highlight={searchQuery} />
                </h4>

                {price ? (
                    <div className="card-price">
                        ${(price / 100).toFixed(2)}
                    </div>
                ) : null}

                <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        setAnimating('cart');
                        setTimeout(() => setAnimating('none'), 500);
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export const CardApp = () => {
    // 1. Retrieve category filter and search query state from Zustand
    const { selectedCategory, searchQuery } = useStore();

    // 2. Fetch products using React Query (automatic caching)
    const { data: allData, isLoading, isError } = useQuery({
        queryKey: ['products'], // Unique cache key
        queryFn: async () => {
            const res = await fetch('https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json');
            if (!res.ok) throw new Error('Network error');
            return res.json();
        },
    });

    // Handle Loading & Error states
    if (isLoading) return <Loading />;

    const finalData = isError || !allData ? [] : allData;

    // 3. Client-side Filter Logic
    // Helper function: normalize to lowercase and strip hyphens/whitespace
    const formatStr = (str) => (str || "").toLowerCase().replace(/[-\s]/g, "");
    const queryFormatted = formatStr(searchQuery);

    const displayData = finalData.filter(item => {
        // Check category match
        const categoryMatch = selectedCategory === "ALL" ||
            (item.category || "").toLowerCase() === selectedCategory.toLowerCase();

        // Check search query match (across name, description, and keywords)
        let searchMatch = true;
        if (queryFormatted) {
            const nameMatch = formatStr(item.name).includes(queryFormatted);
            const descMatch = formatStr(item.description).includes(queryFormatted);
            const keywordMatch = item.keywords ? item.keywords.some(k => formatStr(k).includes(queryFormatted)) : false;
            searchMatch = nameMatch || descMatch || keywordMatch;
        }

        return categoryMatch && searchMatch;
    });

    return (
        <div className="section-container">
            <SearchBar />

            {selectedCategory !== "ALL" && (
                <h3>Category: {selectedCategory}</h3>
            )}

            {displayData.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Oops! No products found</h3>
                    <p>Try using different keywords or changing the category.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {displayData.map((item, index) => (
                        <ProductCard key={item.id ?? index} item={item} searchQuery={searchQuery} />
                    ))}
                </div>
            )}
        </div>
    );
};
