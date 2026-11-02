import { useState } from 'react';
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
            // Simulate Payment API using a dummy endpoint (JSONPlaceholder POST)
            // Safe on the client side while simulating a real network request
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
                // Additional delay to simulate realistic bank processing latency
                setTimeout(() => {
                    setIsLoading(false);
                    setIsSuccess(true);

                    // Save transaction history
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
        } catch {
            alert("Sorry, an error occurred with the payment gateway.");
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setCheckoutOpen(false);
        setTimeout(() => setIsSuccess(false), 300); // Reset after close transition
    };

    return (
        <div className="checkout-overlay" onClick={handleClose}>
            <div className="checkout-modal" onClick={e => e.stopPropagation()}>
                <button className="checkout-close" onClick={handleClose}><BsX /></button>

                {isSuccess ? (
                    <div className="checkout-success">
                        <BsCheckCircle className="success-icon" />
                        <h2>Payment Successful!</h2>
                        <p>Thank you for your order. Your transaction details have been sent to your email.</p>
                        <button className="done-btn" onClick={handleClose}>Continue Shopping</button>
                    </div>
                ) : (
                    <div className="checkout-form-container">
                        <h2>Payment Checkout</h2>
                        <div className="checkout-summary">
                            <span>Total Amount:</span>
                            <span className="checkout-total">${totalPrice.toFixed(2)}</span>
                        </div>

                        <form onSubmit={handlePayment} className="checkout-form">
                            <div className="form-group">
                                <label>Name on Card</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Credit / Debit Card Number</label>
                                <div className="card-input-wrapper">
                                    <BsCreditCard className="card-icon" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="0000 0000 0000 0000"
                                        maxLength="19"
                                        value={formData.card}
                                        onChange={e => setFormData({ ...formData, card: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Expiration Date</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        value={formData.exp}
                                        onChange={e => setFormData({ ...formData, exp: e.target.value })}
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
                                        onChange={e => setFormData({ ...formData, cvc: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="pay-btn" disabled={isLoading}>
                                {isLoading ? "Processing Transaction..." : `Pay $${totalPrice.toFixed(2)}`}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
