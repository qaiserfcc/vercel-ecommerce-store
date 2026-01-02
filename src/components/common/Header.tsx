'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, User, Menu, X, Heart, Search } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="py-2 border-b border-gray-700 text-sm">
          <div className="flex justify-between items-center">
            <p className="text-secondary">Welcome to Namecheap - Share Profit with Every Purchase!</p>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-primary transition">About</Link>
              <Link href="/contact" className="hover:text-primary transition">Contact</Link>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5L5 15V25L20 35L35 25V15L20 5Z" fill="#2D2D2D" stroke="#87CEEB" strokeWidth="2"/>
                  <text x="20" y="25" fontSize="16" fill="#FDB813" textAnchor="middle" fontWeight="bold">N</text>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Namecheap</h1>
                <p className="text-xs text-secondary">Share the Profit</p>
              </div>
            </Link>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-10 rounded-lg bg-dark-light text-white border border-gray-600 focus:outline-none focus:border-primary"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Navigation icons */}
            <div className="flex items-center gap-6">
              <Link href="/wishlist" className="hidden md:flex flex-col items-center hover:text-primary transition">
                <Heart size={24} />
                <span className="text-xs">Wishlist</span>
              </Link>
              <Link href="/cart" className="hidden md:flex flex-col items-center hover:text-primary transition relative">
                <ShoppingCart size={24} />
                <span className="text-xs">Cart</span>
                <span className="absolute -top-1 -right-2 bg-primary text-dark text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </Link>
              <Link href="/profile" className="hidden md:flex flex-col items-center hover:text-primary transition">
                <User size={24} />
                <span className="text-xs">Account</span>
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block pb-4`}>
          <ul className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-8">
            <li><Link href="/" className="hover:text-primary transition font-medium">Home</Link></li>
            <li><Link href="/shop" className="hover:text-primary transition font-medium">Shop</Link></li>
            <li><Link href="/bundles" className="hover:text-primary transition font-medium">Bundles</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-primary transition font-medium">New Arrivals</Link></li>
            <li><Link href="/bestsellers" className="hover:text-primary transition font-medium">Bestsellers</Link></li>
            <li><Link href="/brands" className="hover:text-primary transition font-medium">Brands</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
