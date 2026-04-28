import React from 'react';
import { useStore } from '../store/store';
import { BsShopWindow, BsReceiptCutoff } from 'react-icons/bs';
import './Navbar.css';

const Navbar = () => {
    const { activePage, setActivePage } = useStore();

    return (
        <nav className="top-navbar">
            <div className="navbar-logo">
                <span className="logo-icon">🛍️</span>
                <h2>E-Shop Gallery</h2>
            </div>
            <div className="navbar-menu">
                <button 
                    className={`nav-btn ${activePage === 'HOME' ? 'active' : ''}`}
                    onClick={() => setActivePage('HOME')}
                >
                    <BsShopWindow /> Beranda Utama
                </button>
                <button 
                    className={`nav-btn ${activePage === 'TRANSACTIONS' ? 'active' : ''}`}
                    onClick={() => setActivePage('TRANSACTIONS')}
                >
                    <BsReceiptCutoff /> Riwayat Transaksi
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
