import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();

    return (
        <nav style={{ backgroundColor: 'var(--card-bg)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>ElectroStore</h1>
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to="/" style={{ fontWeight: 500 }}>Home</Link>
                    <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>Cart</span>
                        <span style={{ backgroundColor: 'var(--accent-color)', color: 'var(--text-color)', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            {cartCount}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
