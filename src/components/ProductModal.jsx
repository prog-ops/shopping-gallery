import React from 'react';
import { useStore } from '../store/store';
import { BsX, BsCart3, BsHeartFill, BsHeart } from 'react-icons/bs';
import './ProductModal.css';

const ProductModal = () => {
    const { 
        selectedProduct, 
        clearSelectedProduct, 
        addToCart, 
        toggleFavorite, 
        favorites 
    } = useStore();

    if (!selectedProduct) return null;

    const isFavorite = favorites.some(fav => fav.id === selectedProduct.id);

    return (
        <div className="modal-overlay" onClick={clearSelectedProduct}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={clearSelectedProduct}>
                    <BsX />
                </button>
                
                <div className="modal-image-container">
                    <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="modal-image" 
                    />
                </div>
                
                <div className="modal-details">
                    <h2 className="modal-title">{selectedProduct.name}</h2>
                    
                    {selectedProduct.category && (
                        <span className="modal-category">{selectedProduct.category}</span>
                    )}

                    <div className="modal-price">
                        ${(selectedProduct.priceCents / 100).toFixed(2)}
                    </div>
                    
                    {selectedProduct.rating && selectedProduct.rating.stars && (
                        <div className="modal-rating">
                            ★ {selectedProduct.rating.stars} 
                            <span className="modal-rating-count">
                                ({selectedProduct.rating.count} reviews)
                            </span>
                        </div>
                    )}
                    
                    <p className="modal-description">
                        {selectedProduct.description || "Tidak ada deskripsi tersedia untuk produk ini."}
                    </p>

                    <div className="modal-actions">
                        <button 
                            className="modal-add-cart-btn"
                            onClick={() => {
                                addToCart(selectedProduct);
                                clearSelectedProduct();
                            }}
                        >
                            <BsCart3 /> Masukkan Keranjang
                        </button>
                        <button 
                            className="modal-fav-btn"
                            onClick={() => toggleFavorite(selectedProduct)}
                        >
                            {isFavorite ? <BsHeartFill color="#ff4757" /> : <BsHeart />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
