import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../types';
import api from '../services/api';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container">Loading orders...</div>;
  }

  return (
    <div className="container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.order_number}</h3>
              <p>Status: {order.status}</p>
              <p>Total: ${order.final_amount}</p>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <Link to={`/orders/${order.id}`} className="btn-secondary">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
