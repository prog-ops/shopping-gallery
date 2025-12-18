import React, { useEffect, useState } from "react";
import mockData from '../api3.json';

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
                {mediaUri ? (
                    <img src={mediaUri} alt={title} loading="lazy" />
                ) : (
                    <div className="no-image-placeholder">No Image</div>
                )}

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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.testvalley.kr/collections?prearrangedDiscount&type=SINGLE&viewType=TILE')
            .then(res => res.json())
            .then(result => setData(result.items || []))
            .catch(err => {
                console.warn('Using offline data:', err);
                setData(mockData.items || []);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-skeleton-grid">Loading...</div>;
    if (!data.length) return null;

    return (
        <div className="section-container">
            {/* Grid Wrapper */}
            <div className="product-grid">
                {data.map((item, index) => (
                    <ProductCard key={item.id || index} item={item} />
                ))}
            </div>
        </div>
    );
};
