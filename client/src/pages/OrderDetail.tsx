import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Order } from '../types';
import api from '../services/api';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const data = await api.getOrder(Number(id));
      setOrder(data);
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await api.cancelOrder(Number(id));
        loadOrder();
        alert('Order cancelled successfully');
      } catch (error: any) {
        alert(error.response?.data?.error || 'Failed to cancel order');
      }
    }
  };

  if (loading) {
    return <div className="container">Loading order...</div>;
  }

  if (!order) {
    return <div className="container">Order not found</div>;
  }

  return (
    <div className="container">
      <h1>Order Details</h1>
      <div className="order-details">
        <p><strong>Order Number:</strong> {order.order_number}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        <p><strong>Total Amount:</strong> ${order.total_amount}</p>
        <p><strong>Discount:</strong> ${order.discount_amount}</p>
        <p><strong>Final Amount:</strong> ${order.final_amount}</p>

        <h2>Items</h2>
        <div className="order-items">
          {order.items?.map((item) => (
            <div key={item.id} className="order-item">
              <p><strong>{item.product_name}</strong></p>
              <p>Quantity: {item.quantity} × ${item.price} = ${item.subtotal}</p>
            </div>
          ))}
        </div>

        {order.shipping_address && (
          <div>
            <h3>Shipping Address</h3>
            <p>{order.shipping_address}</p>
          </div>
        )}

        {['pending', 'confirmed'].includes(order.status) && (
          <button className="btn-danger" onClick={handleCancelOrder}>
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
