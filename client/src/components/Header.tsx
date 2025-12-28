import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import api from '../services/api';
import '../styles/Header.css';

const Header: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      loadCartCount();
      loadNotificationCount();
    }
  }, [isAuthenticated]);

  const loadCartCount = async () => {
    try {
      const cart = await api.getCart();
      const count = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const loadNotificationCount = async () => {
    try {
      const data = await api.getUnreadCount();
      setNotificationCount(data.count);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">E-Commerce Store</Link>
        </div>

        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="cart-link">
                🛒 Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </Link>
              <Link to="/orders" className="orders-link">
                📦 Orders
              </Link>
              <div className="notification-icon">
                🔔 {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
              </div>
              <div className="user-menu">
                <span>Hi, {user?.first_name || user?.email}</span>
                <div className="dropdown">
                  <Link to="/profile">Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-link">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
