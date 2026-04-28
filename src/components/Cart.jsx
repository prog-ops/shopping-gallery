import React from 'react';
import { useStore } from '../store/store';
import { BsCart3, BsTrash, BsPlus, BsDash } from 'react-icons/bs';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useStore();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.priceCents * item.quantity), 0) / 100;

    return (
        <div className="cart-hover-container">
            {/* Cart Icon (Trigger) */}
            <div className="cart-icon-wrapper">
                <BsCart3 className="cart-icon" />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>

            {/* Cart Drawer */}
            <div className="cart-drawer">
                <div className="cart-header">
                    <h2>Keranjang</h2>
                    <span className="cart-count">{totalItems} Item</span>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <BsCart3 size={48} color="#ccc" />
                            <p>Keranjang masih kosong</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-title">{item.name}</h4>
                                    <div className="cart-item-price">${(item.priceCents / 100).toFixed(2)}</div>
                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, -1)}><BsDash /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}><BsPlus /></button>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                            <BsTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button 
                            className="checkout-btn"
                            onClick={() => {
                                useStore.getState().setCheckoutOpen(true);
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
