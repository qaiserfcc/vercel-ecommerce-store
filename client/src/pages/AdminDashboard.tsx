import React, { useEffect, useState } from 'react';
import { DashboardStats } from '../types';
import api from '../services/api';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await api.getDashboard();
      setStats(data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="container">Error loading dashboard</div>;
  }

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p className="stat-value">{stats.pendingOrders}</p>
        </div>
      </div>

      <h2>Recent Orders</h2>
      <div className="recent-orders">
        {stats.recentOrders.map((order) => (
          <div key={order.id} className="order-card">
            <p><strong>#{order.order_number}</strong></p>
            <p>Status: {order.status}</p>
            <p>Amount: ${order.final_amount}</p>
            <p>{new Date(order.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <h2>Low Stock Products</h2>
      <div className="low-stock">
        {stats.lowStockProducts.map((product) => (
          <div key={product.id} className="product-card">
            <p><strong>{product.name}</strong></p>
            <p>Stock: {product.stock_quantity}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
