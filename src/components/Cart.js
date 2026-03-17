import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
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
        <h1>Shopping Cart</h1>
        <p className="page-subtitle">{cartCount} item{cartCount !== 1 ? 's' : ''} in your cart</p>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image-wrapper">
                <img src={item.image} alt={item.title} className="cart-item-image" />
              </div>
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <p className="cart-item-quantity">Qty: {item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <p className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({cartCount} items)</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
