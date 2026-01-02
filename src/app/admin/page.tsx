'use client';

import { ShoppingCart, Users, Package, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  // Mock data - will be replaced with API calls
  const stats = {
    totalOrders: 1234,
    totalRevenue: 45678.90,
    totalUsers: 567,
    totalProducts: 89,
  };

  const recentOrders = [
    { id: 1, orderNumber: 'ORD-123', customer: 'John Doe', total: 299.99, status: 'completed' },
    { id: 2, orderNumber: 'ORD-124', customer: 'Jane Smith', total: 499.99, status: 'processing' },
    { id: 3, orderNumber: 'ORD-125', customer: 'Bob Johnson', total: 149.99, status: 'shipped' },
  ];

  const topProducts = [
    { id: 1, name: 'Wireless Headphones', clicks: 1234, sales: 89 },
    { id: 2, name: 'Smart Watch', clicks: 987, sales: 67 },
    { id: 3, name: 'Laptop Stand', clicks: 856, sales: 54 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/20 p-3 rounded-lg">
              <ShoppingCart className="text-primary" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Orders</h3>
          <p className="text-3xl font-bold text-dark">{stats.totalOrders}</p>
        </div>

        <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg">
              <DollarSign className="text-secondary" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-dark">${stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="card bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/20 p-3 rounded-lg">
              <Users className="text-primary" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-dark">{stats.totalUsers}</p>
        </div>

        <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg">
              <Package className="text-secondary" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Products</h3>
          <p className="text-3xl font-bold text-dark">{stats.totalProducts}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">Recent Orders</h2>
            <Link href="/admin/orders" className="text-primary hover:text-primary-dark">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-dark">{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">${order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">Top Products</h2>
            <Link href="/admin/analytics" className="text-primary hover:text-primary-dark">
              View Analytics →
            </Link>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-dark">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.clicks} clicks</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-dark">{product.sales}</p>
                  <p className="text-xs text-gray-600">sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
