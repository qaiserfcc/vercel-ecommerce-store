import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart as CartType } from '../types';
import api from '../services/api';
import '../styles/Cart.css';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await api.getCart();
      setCart(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    try {
      const data = await api.updateCartItem(itemId, quantity);
      setCart(data);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update cart');
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      const data = await api.removeFromCart(itemId);
      setCart(data);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to remove item');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <div className="container">Loading cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
        <button className="btn-primary" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button className="btn-remove" onClick={() => handleRemoveItem(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Cart Total: ${cart.total}</h2>
          <button className="btn-primary btn-large" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
