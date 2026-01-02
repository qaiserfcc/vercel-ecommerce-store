'use client';

import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  // Mock data - will be replaced with API calls
  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-1234567890',
      date: '2024-01-15',
      status: 'delivered',
      total: 499.97,
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
        { name: 'Smart Watch', quantity: 2, price: 199.99 },
      ],
    },
    {
      id: 2,
      orderNumber: 'ORD-1234567891',
      date: '2024-01-20',
      status: 'shipped',
      total: 89.98,
      items: [
        { name: 'USB-C Hub', quantity: 1, price: 39.99 },
        { name: 'Laptop Stand', quantity: 1, price: 49.99 },
      ],
    },
    {
      id: 3,
      orderNumber: 'ORD-1234567892',
      date: '2024-01-22',
      status: 'processing',
      total: 129.99,
      items: [
        { name: 'Mechanical Keyboard', quantity: 1, price: 129.99 },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={24} />;
      case 'processing':
        return <Package className="text-yellow-500" size={24} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <Package className="text-gray-500" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2 flex items-center gap-3">
          <Package className="text-primary" size={36} />
          My Orders
        </h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="card text-center py-12">
          <Package className="mx-auto text-gray-300 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-dark mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
          <Link href="/shop" className="inline-block btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="card hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2">
                    Order #{order.orderNumber}
                  </h3>
                  <p className="text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  {getStatusIcon(order.status)}
                  <span className={`px-4 py-2 rounded-lg font-semibold capitalize ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="font-semibold mb-3">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xl font-bold text-primary">
                  Total: ${order.total.toFixed(2)}
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/orders/${order.id}/tracking`}
                    className="btn-outline"
                  >
                    Track Order
                  </Link>
                  <Link
                    href={`/orders/${order.id}`}
                    className="btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
