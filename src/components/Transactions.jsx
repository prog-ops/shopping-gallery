import React from 'react';
import { useStore } from '../store/store';
import { BsBagCheck, BsClockHistory, BsBoxSeam } from 'react-icons/bs';
import './Transactions.css';

const Transactions = () => {
    const { transactions } = useStore();

    if (transactions.length === 0) {
        return (
            <div className="empty-transactions">
                <BsClockHistory className="empty-icon" />
                <h2>Belum Ada Transaksi</h2>
                <p>Anda belum melakukan pembelian apapun. Yuk, mulai belanja!</p>
            </div>
        );
    }

    return (
        <div className="transactions-container">
            <div className="transactions-header">
                <h2>Riwayat Transaksi Saya</h2>
                <p>Catatan semua pembelian yang telah Anda lakukan.</p>
            </div>

            <div className="transactions-list">
                {transactions.map((trx) => {
                    const dateObj = new Date(trx.date);
                    const formattedDate = dateObj.toLocaleDateString('id-ID', {
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
                                    <span className="trx-status"><BsBagCheck /> Berhasil</span>
                                </div>
                                <div className="trx-id">Order ID: #{trx.id}</div>
                            </div>
                            
                            <div className="trx-body">
                                <div className="trx-customer">
                                    <strong>Penerima:</strong> {trx.customerName || "Customer"}
                                </div>
                                <div className="trx-items">
                                    {trx.items.map(item => (
                                        <div key={item.id} className="trx-item-row">
                                            <div className="trx-item-name">
                                                <BsBoxSeam className="item-icon"/>
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
                                <span className="trx-total-label">Total Belanja:</span>
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
