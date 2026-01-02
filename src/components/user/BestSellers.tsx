'use client';

import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';

// Mock data - will be replaced with API calls
const bestSellers = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    price: 99.99,
    image: '/images/products/product1.jpg',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    price: 199.99,
    image: '/images/products/product2.jpg',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Laptop Stand Ergonomic',
    slug: 'laptop-stand-ergonomic',
    price: 49.99,
    image: '/images/products/product3.jpg',
    rating: 4.3,
  },
  {
    id: 4,
    name: 'USB-C Hub Multi-Port',
    slug: 'usb-c-hub-multi-port',
    price: 39.99,
    image: '/images/products/product4.jpg',
    rating: 4.6,
  },
];

export default function BestSellers() {
  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-dark mb-2">Best Sellers</h2>
          <p className="text-gray-600">Our most popular products this month</p>
        </div>
        <Link href="/shop?bestsellers=true" className="text-primary hover:text-primary-dark font-semibold">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <div key={product.id} className="card group hover:shadow-xl transition-shadow">
            <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100 h-64">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ShoppingCart size={48} />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                <button className="bg-white p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition">
                  <Heart size={20} />
                </button>
              </div>
            </div>
            
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-semibold text-lg mb-2 hover:text-primary transition">{product.name}</h3>
            </Link>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">${product.price}</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>
            
            <button className="w-full mt-4 btn-primary">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
