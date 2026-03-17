import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="page-container">
        <div className="empty-state success-state">
          <div className="empty-state-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. Your order is being processed.</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h2>Nothing to checkout</h2>
          <p>Add some products to your cart first.</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Checkout</h1>
        <p className="page-subtitle">Review your order before placing it</p>
      </div>
      <div className="checkout-layout">
        <div className="checkout-items">
          <h3>Order Items</h3>
          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <img src={item.image} alt={item.title} className="checkout-item-image" />
              <div className="checkout-item-details">
                <p className="checkout-item-title">{item.title}</p>
                <p className="checkout-item-meta">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="checkout-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="checkout-summary">
          <h3>Payment Summary</h3>
          <div className="summary-row">
            <span>Items ({cartCount})</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>${(cartTotal * 0.08).toFixed(2)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${(cartTotal * 1.08).toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="btn btn-primary btn-lg btn-block"
          >
            🛍️ Place Order
          </button>
          <Link to="/cart" className="btn btn-outline btn-block">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
