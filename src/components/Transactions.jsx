import { useStore } from '../store/store';
import { BsBagCheck, BsClockHistory, BsBoxSeam } from 'react-icons/bs';
import './Transactions.css';

const Transactions = () => {
    const { transactions } = useStore();

    if (transactions.length === 0) {
        return (
            <div className="empty-transactions">
                <BsClockHistory className="empty-icon" />
                <h2>No Transactions Yet</h2>
                <p>You haven&apos;t made any purchases yet. Start shopping now!</p>
            </div>
        );
    }

    return (
        <div className="transactions-container">
            <div className="transactions-header">
                <h2>My Transaction History</h2>
                <p>A record of all purchases you have completed.</p>
            </div>

            <div className="transactions-list">
                {transactions.map((trx) => {
                    const dateObj = new Date(trx.date);
                    const formattedDate = dateObj.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return (
                        <div key={trx.id} className="transaction-card">
                            <div className="trx-header">
                                <div className="trx-info">
                                    <span className="trx-date"><BsClockHistory /> {formattedDate}</span>
                                    <span className="trx-status"><BsBagCheck /> Completed</span>
                                </div>
                                <div className="trx-id">Order ID: #{trx.id}</div>
                            </div>

                            <div className="trx-body">
                                <div className="trx-customer">
                                    <strong>Recipient:</strong> {trx.customerName || "Customer"}
                                </div>
                                <div className="trx-items">
                                    {trx.items.map(item => (
                                        <div key={item.id} className="trx-item-row">
                                            <div className="trx-item-name">
                                                <BsBoxSeam className="item-icon" />
                                                {item.name} <span className="trx-qty">x{item.quantity}</span>
                                            </div>
                                            <div className="trx-item-price">
                                                ${((item.priceCents * item.quantity) / 100).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="trx-footer">
                                <span className="trx-total-label">Total Amount:</span>
                                <span className="trx-total-amount">${trx.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Transactions;
