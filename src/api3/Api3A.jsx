import React, { useEffect, useState } from "react";
import mockData from '../api3.json';
import {useQuery} from "@tanstack/react-query";
import { useStore } from "../store/store";
import Loading from "../components/Loading.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";

// Komponen Kartu Produk
const ProductCard = ({ item }) => {
    // 1. Ekstrak Data dengan Aman (Optional Chaining)
    // Prioritas gambar: Thumbnail collection -> Media collection -> Gambar produk pertama
    const mediaUri =
        item.thumbnail?.uri ||
        item.media?.[0]?.uri ||
        item.items?.[0]?.publication?.media?.[0]?.uri;

    const title = item.title || item.items?.[0]?.publication?.title || 'No Title';
    const description = item.description;

    // Data Harga (Ambil dari produk pertama di dalam collection)
    const priceInfo = item.items?.[0]?.publication?.priceInfo;
    const discountRate = priceInfo?.couponDiscountRate || priceInfo?.discountRate;
    const price = priceInfo?.couponDiscountPrice || priceInfo?.discountPrice;

    return (
        <div className="product-card">
            <div className="card-image-wrapper">
                {/* 2. Hapus logic ternary if (mediaUri ? img : div) yang lama.
               Langsung saja pasang ImageWithFallback.
               Dia otomatis handle jika mediaUri null/undefined.
        */}
                <ImageWithFallback
                    src={mediaUri}
                    alt={title}
                />

                {/* Badge Diskon di Gambar (Opsional, lebih modern) */}
                {discountRate && (
                    <span className="discount-badge">
            {discountRate}%
          </span>
                )}
            </div>

            <div className="card-info">
                <h4 className="card-title">{title}</h4>

                {/* Deskripsi atau Harga */}
                {description ? (
                    <p className="card-desc">{description}</p>
                ) : price ? (
                    <div className="card-price">
                        {price.toLocaleString()} <span className="currency">KRW</span>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export const Api3AApp = () => {
    // 1. Ambil state filter dari Zustand
    const { selectedCategory } = useStore();

    // 2. Ambil data dengan React Query (Otomatis Caching!)
    const { data: allData, isLoading, isError } = useQuery({
        queryKey: ['products'], // Key unik untuk cache
        queryFn: async () => {
            const res = await fetch('https://api.testvalley.kr/collections?prearrangedDiscount&type=SINGLE&viewType=TILE');
            if (!res.ok) throw new Error('Network error');
            const json = await res.json();
            return json.items;
        },
        // Jika error, fallback ke mockData bisa dihandle di sini atau di UI
    });

    // Handle Loading & Error
    if (isLoading) return <Loading />;

    // Gunakan data dari cache atau fallback ke mockData jika fetch gagal
    const finalData = isError || !allData ? mockData.items : allData;

    // 3. Logic Filter (Client Side)
    const displayData = selectedCategory === "ALL"
        ? finalData
        : finalData.filter(item => {
            const title = item.title || item.items?.[0]?.publication?.title || "";
            return title.toLowerCase().includes(selectedCategory.toLowerCase());
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
