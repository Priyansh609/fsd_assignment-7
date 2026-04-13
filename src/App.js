import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import './App.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛍️</span>
          <span className="brand-text">ShopVibe</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <span className="nav-icon">🛒</span>
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <span className="nav-user">
                <span className="nav-icon">👤</span>
                {user?.name?.split(' ')[0]}
              </span>
              <button onClick={logout} className="btn btn-outline btn-sm nav-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© 2026 ShopVibe — Built with ❤️ using React</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
