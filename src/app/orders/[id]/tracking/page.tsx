'use client';

import { useParams } from 'next/navigation';
import { MapPin, Package, Truck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.id;

  // Mock tracking data - will be replaced with API calls
  const tracking = [
    {
      id: 1,
      status: 'Order Placed',
      description: 'Your order has been placed successfully',
      location: 'Online',
      timestamp: '2024-01-22 10:30 AM',
      completed: true,
    },
    {
      id: 2,
      status: 'Processing',
      description: 'Your order is being prepared',
      location: 'Warehouse - New York',
      timestamp: '2024-01-22 02:15 PM',
      completed: true,
    },
    {
      id: 3,
      status: 'Shipped',
      description: 'Your package has been shipped',
      location: 'Distribution Center - Newark',
      timestamp: '2024-01-23 09:00 AM',
      completed: true,
    },
    {
      id: 4,
      status: 'Out for Delivery',
      description: 'Your package is out for delivery',
      location: 'Local Delivery Center',
      timestamp: '2024-01-24 07:30 AM',
      completed: false,
    },
    {
      id: 5,
      status: 'Delivered',
      description: 'Package will be delivered',
      location: 'Your Address',
      timestamp: 'Expected: 2024-01-24 06:00 PM',
      completed: false,
    },
  ];

  const orderDetails = {
    orderNumber: 'ORD-1234567892',
    estimatedDelivery: 'January 24, 2024',
    carrier: 'FedEx',
    trackingNumber: '1234567890123456',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/orders" className="text-primary hover:text-primary-dark mb-4 inline-block">
          ← Back to Orders
        </Link>
        <h1 className="text-4xl font-bold text-dark mb-2">Order Tracking</h1>
        <p className="text-gray-600">Track your order #{orderDetails.orderNumber}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Timeline */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold text-dark mb-6">Tracking Information</h2>

            <div className="relative">
              {tracking.map((event, index) => (
                <div key={event.id} className="flex gap-4 pb-8 last:pb-0">
                  {/* Timeline Line */}
                  {index < tracking.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                  )}

                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    event.completed ? 'bg-primary' : 'bg-gray-200'
                  }`}>
                    {event.status === 'Order Placed' && <Package className="text-white" size={24} />}
                    {event.status === 'Processing' && <Package className={event.completed ? 'text-white' : 'text-gray-400'} size={24} />}
                    {event.status === 'Shipped' && <Truck className={event.completed ? 'text-white' : 'text-gray-400'} size={24} />}
                    {event.status === 'Out for Delivery' && <Truck className={event.completed ? 'text-white' : 'text-gray-400'} size={24} />}
                    {event.status === 'Delivered' && <CheckCircle className={event.completed ? 'text-white' : 'text-gray-400'} size={24} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${event.completed ? 'text-dark' : 'text-gray-400'}`}>
                      {event.status}
                    </h3>
                    <p className={`mb-1 ${event.completed ? 'text-gray-700' : 'text-gray-400'}`}>
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-2xl font-bold text-dark mb-6">Delivery Details</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Estimated Delivery</p>
                <p className="text-lg font-bold text-primary">{orderDetails.estimatedDelivery}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-600 mb-1">Carrier</p>
                <p className="font-semibold">{orderDetails.carrier}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-600 mb-1">Tracking Number</p>
                <p className="font-mono text-sm">{orderDetails.trackingNumber}</p>
              </div>

              <div className="border-t pt-4">
                <Link
                  href={`/orders/${orderId}`}
                  className="block w-full text-center btn-primary"
                >
                  View Order Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
