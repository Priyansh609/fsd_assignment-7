import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <span className="error-icon">⚠️</span>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Products</h1>
        <p className="page-subtitle">Discover our curated collection of premium products</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <span className="product-category">{product.category}</span>
            </div>
            <div className="product-info">
              <h3 className="product-title" title={product.title}>
                {product.title}
              </h3>
              <div className="product-rating">
                {'★'.repeat(Math.round(product.rating?.rate || 0))}
                {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
                <span className="rating-count">({product.rating?.count})</span>
              </div>
              <div className="product-card-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
