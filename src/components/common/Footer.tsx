import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-primary text-xl font-bold mb-4">Namecheap</h3>
            <p className="text-gray-300 mb-4">
              Share the profit with every purchase! We believe in fair pricing and giving back to our customers through bulk discounts, referral bonuses, and more.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition"><Mail size={20} /></a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-300 hover:text-primary transition">Shop</Link></li>
              <li><Link href="/new-arrivals" className="text-gray-300 hover:text-primary transition">New Arrivals</Link></li>
              <li><Link href="/bestsellers" className="text-gray-300 hover:text-primary transition">Bestsellers</Link></li>
              <li><Link href="/bundles" className="text-gray-300 hover:text-primary transition">Bundles</Link></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/profile" className="text-gray-300 hover:text-primary transition">My Account</Link></li>
              <li><Link href="/orders" className="text-gray-300 hover:text-primary transition">Track Order</Link></li>
              <li><Link href="/wishlist" className="text-gray-300 hover:text-primary transition">Wishlist</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-primary transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">Subscribe to get special offers and updates!</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-dark-light border border-gray-600 focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-dark px-4 py-2 rounded-r-lg font-semibold hover:bg-primary-dark transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Namecheap. All rights reserved. Built with passion for sharing profits.</p>
        </div>
      </div>
    </footer>
  );
}
