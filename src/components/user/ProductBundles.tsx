'use client';

import Link from 'next/link';
import { Package } from 'lucide-react';

// Mock data
const bundles = [
  {
    id: 1,
    name: 'Home Office Essentials',
    slug: 'home-office-essentials',
    description: 'Everything you need for a productive home office',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    items: 5,
  },
  {
    id: 2,
    name: 'Tech Enthusiast Bundle',
    slug: 'tech-enthusiast-bundle',
    description: 'Latest gadgets for tech lovers',
    price: 499.99,
    originalPrice: 649.99,
    discount: 23,
    items: 4,
  },
  {
    id: 3,
    name: 'Fitness Starter Pack',
    slug: 'fitness-starter-pack',
    description: 'Start your fitness journey right',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    items: 6,
  },
];

export default function ProductBundles() {
  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-dark mb-2">Product Bundles</h2>
          <p className="text-gray-600">Save more when you buy bundled products</p>
        </div>
        <Link href="/bundles" className="text-primary hover:text-primary-dark font-semibold">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <div key={bundle.id} className="card bg-gradient-to-br from-secondary/10 to-primary/10 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-3 rounded-full">
                <Package size={24} className="text-white" />
              </div>
              <div>
                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                  SAVE {bundle.discount}%
                </span>
                <p className="text-sm text-gray-600 mt-1">{bundle.items} items included</p>
              </div>
            </div>

            <Link href={`/bundle/${bundle.slug}`}>
              <h3 className="font-bold text-xl mb-2 hover:text-primary transition">{bundle.name}</h3>
            </Link>
            
            <p className="text-gray-600 mb-4">{bundle.description}</p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-primary">${bundle.price}</span>
              <span className="text-gray-500 line-through">${bundle.originalPrice}</span>
            </div>

            <Link href={`/bundle/${bundle.slug}`} className="block w-full text-center btn-primary">
              View Bundle
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
