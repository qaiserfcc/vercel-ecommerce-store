'use client';

import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  // Mock data - will be replaced with API calls
  const [cartItems, setCartItems] = useState([
    { id: 1, productId: 1, name: 'Wireless Headphones', slug: 'wireless-headphones', price: 99.99, quantity: 1 },
    { id: 2, productId: 2, name: 'Smart Watch', slug: 'smart-watch', price: 199.99, quantity: 2 },
    { id: 3, productId: 4, name: 'USB-C Hub', slug: 'usb-c-hub', price: 39.99, quantity: 1 },
  ]);

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyDiscount = () => {
    // Mock discount validation
    if (discountCode === 'SAVE10') {
      setAppliedDiscount(10);
    } else {
      alert('Invalid discount code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2 flex items-center gap-3">
          <ShoppingCart className="text-primary" size={36} />
          Shopping Cart
        </h1>
        <p className="text-gray-600">{cartItems.length} items in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="card text-center py-12">
          <ShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-dark mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link href="/shop" className="inline-block btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="card flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="text-gray-400" size={32} />
                </div>

                <div className="flex-1">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="text-xl font-bold text-dark mb-2 hover:text-primary transition">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${item.price}</span>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-2">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-2xl font-bold text-dark mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Discount Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 input-field"
                  />
                  <button
                    onClick={applyDiscount}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <Link href="/checkout" className="block w-full text-center btn-primary mb-3">
                Proceed to Checkout
              </Link>
              
              <Link href="/shop" className="block w-full text-center btn-outline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
