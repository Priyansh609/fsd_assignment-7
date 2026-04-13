import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { isAuthenticated, token } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || '';

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      setPaymentResult({
        success: false,
        message: 'Please sign in to place an order',
      });
      return;
    }

    setPaymentLoading(true);
    setPaymentResult(null);

    try {
      const res = await axios.post(
        `${API_BASE}/api/payment/pay`,
        {
          amount: (cartTotal * 1.08).toFixed(2),
          cardNumber: '4111111111111111',
          cardHolder: 'Test Customer',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPaymentResult(res.data);
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      setPaymentResult(
        err.response?.data || {
          success: false,
          message: 'Payment failed. Please try again.',
        }
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  if (orderPlaced && paymentResult?.success) {
    return (
      <div className="page-container">
        <div className="empty-state success-state">
          <div className="empty-state-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. Your order is being processed.</p>
          {paymentResult.data && (
            <div className="payment-receipt">
              <p><strong>Transaction ID:</strong> {paymentResult.data.transactionId}</p>
              <p><strong>Amount Paid:</strong> ${paymentResult.data.amount}</p>
              <p><strong>Status:</strong> {paymentResult.data.status}</p>
            </div>
          )}
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
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

      {paymentResult && !paymentResult.success && (
        <div className="auth-error" style={{ marginBottom: '20px' }}>
          {paymentResult.message}
        </div>
      )}

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

          {!isAuthenticated && (
            <div className="checkout-auth-notice">
              <p>⚠️ Please <Link to="/login">sign in</Link> to place your order</p>
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            className="btn btn-primary btn-lg btn-block"
            disabled={paymentLoading || !isAuthenticated}
          >
            {paymentLoading ? '⏳ Processing Payment...' : '🛍️ Place Order'}
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
