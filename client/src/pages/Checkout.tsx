import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({
    shippingAddress: '',
    billingAddress: '',
    discountCode: '',
    paymentMethod: 'card',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = await api.createOrder({
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.billingAddress,
        discountCode: formData.discountCode,
      });

      const payment = await api.createPayment(order.id, formData.paymentMethod);
      await api.processPayment(payment.id);

      alert('Order placed successfully!');
      navigate(`/orders/${order.id}`);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Shipping Address</label>
          <textarea
            value={formData.shippingAddress}
            onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Billing Address</label>
          <textarea
            value={formData.billingAddress}
            onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Discount Code (Optional)</label>
          <input
            type="text"
            value={formData.discountCode}
            onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
          >
            <option value="card">Credit Card</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
