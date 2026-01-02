'use client';

import { useState } from 'react';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  // Mock data - will be replaced with API calls
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, productId: 1, name: 'Wireless Headphones', slug: 'wireless-headphones', price: 99.99, inStock: true },
    { id: 2, productId: 3, name: 'Laptop Stand', slug: 'laptop-stand', price: 49.99, inStock: true },
    { id: 3, productId: 5, name: 'Mechanical Keyboard', slug: 'mechanical-keyboard', price: 129.99, inStock: false },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (productId: number) => {
    // Will be implemented with API call
    console.log('Adding to cart:', productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2 flex items-center gap-3">
          <Heart className="text-primary" size={36} />
          My Wishlist
        </h1>
        <p className="text-gray-600">Save your favorite products for later</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="card text-center py-12">
          <Heart className="mx-auto text-gray-300 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-dark mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Start adding products you love!</p>
          <Link href="/shop" className="inline-block btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="card flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-shadow">
              <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-gray-400" size={48} />
              </div>

              <div className="flex-1">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="text-2xl font-bold text-dark mb-2 hover:text-primary transition">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-primary">${item.price}</span>
                  {item.inStock ? (
                    <span className="text-green-600 font-semibold">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Out of Stock</span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(item.productId)}
                    disabled={!item.inStock}
                    className={`btn-primary ${!item.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <ShoppingCart size={20} className="inline mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="px-6 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold rounded-lg transition"
                  >
                    <Trash2 size={20} className="inline mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
