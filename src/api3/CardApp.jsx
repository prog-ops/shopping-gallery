import React, { useEffect, useState } from "react";
import mockData from '../api3.json';
import {useQuery} from "@tanstack/react-query";
import { useStore } from "../store/store";
import Loading from "../components/Loading.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import SearchBar from "../components/SearchBar.jsx";
import HighlightText from "../components/HighlightText.jsx";

// Komponen Kartu Produk
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
    // 1. Ambil state filter dan pencarian dari Zustand
    const { selectedCategory, searchQuery } = useStore();

    // 2. Ambil data dengan React Query (Otomatis Caching!)
    const { data: allData, isLoading, isError } = useQuery({
        queryKey: ['products'], // Key unik untuk cache
        queryFn: async () => {
            const res = await fetch('https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json');
            if (!res.ok) throw new Error('Network error');
            const json = await res.json();
            return json;
        },
    });

    // Handle Loading & Error
    if (isLoading) return <Loading />;

    const finalData = isError || !allData ? [] : allData;

    // 3. Logic Filter (Client Side)
    // Helper function: hilangkan caps lock (toLowerCase) dan hilangkan strip/spasi
    const formatStr = (str) => (str || "").toLowerCase().replace(/[-\s]/g, "");
    const queryFormatted = formatStr(searchQuery);

    const displayData = finalData.filter(item => {
        // Cek kategori
        const categoryMatch = selectedCategory === "ALL" ||
            (item.category || "").toLowerCase() === selectedCategory.toLowerCase();

        // Cek query pencarian (pada nama, deskripsi, dan keywords)
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
                <h3>Kategori: {selectedCategory}</h3>
            )}

            {displayData.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Ups! Produk tidak ditemukan</h3>
                    <p>Coba gunakan kata kunci lain atau ubah kategori.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {displayData.map((item, index) => (
                        <ProductCard key={index} item={item} searchQuery={searchQuery} />
                    ))}
                </div>
            )}
        </div>
    );
};
