'use client';

import { useState, useEffect } from 'react';
import { Filter, X, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';

export default function ShopPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: '',
  });

  // Mock data - will be replaced with API calls
  const categories = [
    { id: 1, name: 'Electronics', slug: 'electronics' },
    { id: 2, name: 'Accessories', slug: 'accessories' },
    { id: 3, name: 'Home & Office', slug: 'home-office' },
    { id: 4, name: 'Fitness', slug: 'fitness' },
  ];

  const brands = [
    { id: 1, name: 'TechPro', slug: 'techpro' },
    { id: 2, name: 'SmartGadgets', slug: 'smartgadgets' },
    { id: 3, name: 'EcoLife', slug: 'ecolife' },
  ];

  const products = [
    { id: 1, name: 'Wireless Headphones', slug: 'wireless-headphones', price: 99.99, category: 'Electronics', brand: 'TechPro', rating: 4.5 },
    { id: 2, name: 'Smart Watch', slug: 'smart-watch', price: 199.99, category: 'Electronics', brand: 'SmartGadgets', rating: 4.8 },
    { id: 3, name: 'Laptop Stand', slug: 'laptop-stand', price: 49.99, category: 'Home & Office', brand: 'EcoLife', rating: 4.3 },
    { id: 4, name: 'USB-C Hub', slug: 'usb-c-hub', price: 39.99, category: 'Accessories', brand: 'TechPro', rating: 4.6 },
    { id: 5, name: 'Mechanical Keyboard', slug: 'mechanical-keyboard', price: 129.99, category: 'Accessories', brand: 'TechPro', rating: 4.7 },
    { id: 6, name: 'Gaming Mouse', slug: 'gaming-mouse', price: 59.99, category: 'Accessories', brand: 'SmartGadgets', rating: 4.4 },
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2">Shop All Products</h1>
        <p className="text-gray-600">Find the perfect products for your needs</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="card sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary-dark"
              >
                Clear All
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="input-field"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.slug}>{brand.name}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="input-field"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden mb-4 btn-primary w-full flex items-center justify-center gap-2"
          >
            <Filter size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Showing {products.length} products</p>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
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
                
                <p className="text-sm text-gray-600 mb-2">{product.category} • {product.brand}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <button className="w-full btn-primary">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
