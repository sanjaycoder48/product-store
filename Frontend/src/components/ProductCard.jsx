import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.2s'
        }}
            className="product-card"
        >
            <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ height: '200px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {product.image_url ? (
                        <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ color: '#64748b' }}>No Image</span>
                    )}
                </div>
                <div style={{ padding: '1rem 1rem 0 1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</p>
                </div>
            </Link>
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary-color)' }}>${product.price}</span>
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
