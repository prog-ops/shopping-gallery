import React, { useState } from 'react';
import { useStore } from '../store/store';
import { BsX, BsCreditCard, BsCheckCircle } from 'react-icons/bs';
import './CheckoutModal.css';

const CheckoutModal = () => {
    const { isCheckoutOpen, setCheckoutOpen, cart, clearCart, addTransaction } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: '', card: '', exp: '', cvc: '' });

    if (!isCheckoutOpen) return null;

    const totalPrice = cart.reduce((acc, item) => acc + (item.priceCents * item.quantity), 0) / 100;

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulasi API Payment menggunakan dummy endpoint (JSONPlaceholder POST)
            // Aman di sisi client dan juga mensimulasikan network request nyata
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalPrice,
                    items: cart,
                    paymentDetails: formData
                }),
            });

            if (response.ok) {
                // Tambahan delay untuk mensimulasikan pemrosesan bank yang realistis
                setTimeout(() => {
                    setIsLoading(false);
                    setIsSuccess(true);
                    
                    // Simpan riwayat transaksi
                    addTransaction({
                        items: [...cart],
                        totalAmount: totalPrice,
                        customerName: formData.name
                    });
                    
                    clearCart();
                }, 1500);
            } else {
                throw new Error("Payment failed");
            }
        } catch (error) {
            alert("Maaf, terjadi kesalahan pada gateway pembayaran.");
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setCheckoutOpen(false);
        setTimeout(() => setIsSuccess(false), 300); // reset after transition
    };

    return (
        <div className="checkout-overlay" onClick={handleClose}>
            <div className="checkout-modal" onClick={e => e.stopPropagation()}>
                <button className="checkout-close" onClick={handleClose}><BsX /></button>

                {isSuccess ? (
                    <div className="checkout-success">
                        <BsCheckCircle className="success-icon" />
                        <h2>Pembayaran Berhasil!</h2>
                        <p>Terima kasih atas pesanan Anda. Detail transaksi telah dikirim ke email.</p>
                        <button className="done-btn" onClick={handleClose}>Kembali Belanja</button>
                    </div>
                ) : (
                    <div className="checkout-form-container">
                        <h2>Checkout Pembayaran</h2>
                        <div className="checkout-summary">
                            <span>Total Tagihan:</span>
                            <span className="checkout-total">${totalPrice.toFixed(2)}</span>
                        </div>

                        <form onSubmit={handlePayment} className="checkout-form">
                            <div className="form-group">
                                <label>Nama di Kartu</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nomor Kartu Kredit / Debit</label>
                                <div className="card-input-wrapper">
                                    <BsCreditCard className="card-icon" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="0000 0000 0000 0000"
                                        maxLength="19"
                                        value={formData.card}
                                        onChange={e => setFormData({...formData, card: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Masa Berlaku</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        value={formData.exp}
                                        onChange={e => setFormData({...formData, exp: e.target.value})}
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>CVC</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="123"
                                        maxLength="3"
                                        value={formData.cvc}
                                        onChange={e => setFormData({...formData, cvc: e.target.value})}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="pay-btn" disabled={isLoading}>
                                {isLoading ? "Memproses Transaksi..." : `Bayar $${totalPrice.toFixed(2)}`}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
