import React, { useEffect, useState } from "react";
import mockData from '../api3.json';
import {useQuery} from "@tanstack/react-query";
import { useStore } from "../store/store";
import Loading from "../components/Loading.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";

// Komponen Kartu Produk
const ProductCard = ({ item }) => {
    const mediaUri = item.image;
    const title = item.name;
    const price = item.priceCents;
    const rating = item.rating;

    return (
        <div className="product-card">
            <div className="card-image-wrapper">
                <ImageWithFallback
                    src={mediaUri}
                    alt={title}
                />

                {rating && rating.stars && (
                    <span className="discount-badge" style={{ backgroundColor: '#ffc107', color: '#000' }}>
                        ★ {rating.stars}
                    </span>
                )}
            </div>

            <div className="card-info">
                <h4 className="card-title">{title}</h4>

                {price ? (
                    <div className="card-price">
                        ${(price / 100).toFixed(2)}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export const CardApp = () => {
    // 1. Ambil state filter dari Zustand
    const { selectedCategory } = useStore();

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
    const displayData = selectedCategory === "ALL"
        ? finalData
        : finalData.filter(item => {
            const category = item.category || "";
            return category.toLowerCase() === selectedCategory.toLowerCase();
        });

    return (
        <div className="section-container">
            {selectedCategory !== "ALL" && (
                <h3>Kategori: {selectedCategory}</h3>
            )}

            <div className="product-grid">
                {displayData.map((item, index) => (
                    <ProductCard key={index} item={item} />
                ))}
            </div>
        </div>
    );
};
