import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p className="page-subtitle">Sign in to your ShopVibe account</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
