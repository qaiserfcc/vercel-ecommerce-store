'use client';

import { BarChart3, Eye, MousePointerClick, TrendingUp, Users } from 'lucide-react';

export default function AdminAnalyticsPage() {
  // Mock data
  const stats = {
    totalViews: 12543,
    uniqueVisitors: 3421,
    productClicks: 8765,
    conversionRate: 3.2,
  };

  const topProducts = [
    { id: 1, name: 'Wireless Headphones', clicks: 1234, views: 3456, sales: 89, revenue: 8891.11 },
    { id: 2, name: 'Smart Watch', clicks: 987, views: 2987, sales: 67, revenue: 13399.33 },
    { id: 3, name: 'Laptop Stand', clicks: 856, views: 2145, sales: 54, revenue: 2699.46 },
    { id: 4, name: 'USB-C Hub', clicks: 743, views: 1876, sales: 42, revenue: 1679.58 },
  ];

  const pageViews = [
    { page: '/', views: 4321 },
    { page: '/shop', views: 3210 },
    { page: '/product/wireless-headphones', views: 2109 },
    { page: '/cart', views: 1876 },
    { page: '/checkout', views: 654 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2 flex items-center gap-3">
          <BarChart3 className="text-primary" size={36} />
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">Track website performance and user behavior</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/20 p-3 rounded-lg">
              <Eye className="text-primary" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Views</h3>
          <p className="text-3xl font-bold text-dark">{stats.totalViews.toLocaleString()}</p>
        </div>

        <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg">
              <Users className="text-secondary" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Unique Visitors</h3>
          <p className="text-3xl font-bold text-dark">{stats.uniqueVisitors.toLocaleString()}</p>
        </div>

        <div className="card bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/20 p-3 rounded-lg">
              <MousePointerClick className="text-primary" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Product Clicks</h3>
          <p className="text-3xl font-bold text-dark">{stats.productClicks.toLocaleString()}</p>
        </div>

        <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg">
              <TrendingUp className="text-secondary" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Conversion Rate</h3>
          <p className="text-3xl font-bold text-dark">{stats.conversionRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Clicked Products */}
        <div className="card">
          <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
            <MousePointerClick className="text-primary" />
            Most Clicked Products
          </h2>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold">{product.name}</h3>
                  </div>
                  <span className="text-2xl font-bold text-primary">{product.clicks}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">{product.views}</span> views
                  </div>
                  <div>
                    <span className="font-semibold">{product.sales}</span> sales
                  </div>
                  <div>
                    <span className="font-semibold">${product.revenue.toFixed(2)}</span> revenue
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="card">
          <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
            <Eye className="text-primary" />
            Top Pages
          </h2>

          <div className="space-y-4">
            {pageViews.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <code className="text-sm font-mono text-gray-700">{page.page}</code>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-secondary">{page.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
