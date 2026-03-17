import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <span className="error-icon">😕</span>
        <p>Product not found</p>
        <Link to="/" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Back to Products</Link>
      <div className="product-detail">
        <div className="product-detail-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-info">
          <span className="product-category-badge">{product.category}</span>
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-rating">
            {'★'.repeat(Math.round(product.rating?.rate || 0))}
            {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
            <span className="rating-count">
              {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <div className="product-detail-divider"></div>
          <p className="product-detail-description">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className={`btn btn-primary btn-lg ${added ? 'btn-success' : ''}`}
          >
            {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
