import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h2>
                <a href="/" className="btn btn-primary">Continue Shopping</a>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Shopping Cart</h2>

            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                {cartItems.map(item => (
                    <div key={item.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1.5rem',
                        borderBottom: '1px solid #e2e8f0',
                        gap: '1.5rem'
                    }}>
                        <div style={{ width: '80px', height: '80px', backgroundColor: '#f1f5f9', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {item.image_url ? <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span>Img</span>}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.1rem' }}>{item.name}</h3>
                            <p style={{ color: '#64748b' }}>${item.price}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: '500' }}>Qty: {item.quantity}</span>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                style={{ color: '#ef4444', background: 'none', fontWeight: '500' }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <button onClick={clearCart} style={{ color: '#64748b', background: 'none', textDecoration: 'underline' }}>Clear Cart</button>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Total: ${total.toFixed(2)}</p>
                        <button className="btn btn-primary" onClick={() => alert('Checkout not implemented')}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
