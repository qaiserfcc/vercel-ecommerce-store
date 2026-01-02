'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, Sparkles } from 'lucide-react';

// Mock data
const newArrivals = [
  {
    id: 5,
    name: 'Mechanical Keyboard RGB',
    slug: 'mechanical-keyboard-rgb',
    price: 129.99,
    image: '/images/products/product5.jpg',
    isNew: true,
  },
  {
    id: 6,
    name: 'Wireless Mouse Gaming',
    slug: 'wireless-mouse-gaming',
    price: 59.99,
    image: '/images/products/product6.jpg',
    isNew: true,
  },
  {
    id: 7,
    name: 'Portable SSD 1TB',
    slug: 'portable-ssd-1tb',
    price: 149.99,
    image: '/images/products/product7.jpg',
    isNew: true,
  },
  {
    id: 8,
    name: '4K Webcam Pro',
    slug: '4k-webcam-pro',
    price: 89.99,
    image: '/images/products/product8.jpg',
    isNew: true,
  },
];

export default function NewArrivals() {
  return (
    <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5 -mx-4 px-4 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-primary" size={28} />
            <h2 className="text-3xl font-bold text-dark">New Arrivals</h2>
          </div>
          <p className="text-gray-600">Check out our latest products</p>
        </div>
        <Link href="/new-arrivals" className="text-primary hover:text-primary-dark font-semibold">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <div key={product.id} className="card group hover:shadow-xl transition-shadow relative">
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                NEW
              </span>
            </div>
            
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
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-primary">${product.price}</span>
            </div>
            
            <button className="w-full btn-primary">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
