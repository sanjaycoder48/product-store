import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;
    if (!product) return <div className="container" style={{ padding: '2rem' }}>Product not found</div>;

    return (
        <div className="container" style={{ padding: '2rem 0', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ height: '400px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem' }}>
                    {product.image_url ? (
                        <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                        <span>No Image</span>
                    )}
                </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h1>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>${product.price}</p>
                <p style={{ color: '#475569', marginBottom: '2rem', lineHeight: '1.8' }}>{product.description}</p>

                <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                    style={{ alignSelf: 'start' }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
