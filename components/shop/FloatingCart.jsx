'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function FloatingCart() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show empty state during SSR to prevent hydration mismatch
  const cartItems = mounted ? items : [];
  const totalPrice = mounted ? totalPrice : 0;
  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <div className="sticky top-20">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-500 to-green-600">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="font-semibold">Shopping Cart</h3>
            </div>
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-sm font-medium">
              {totalItems} items
            </span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="max-h-[400px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-5xl mb-3 block">🛒</span>
              <p className="text-gray-500 text-sm">Your cart is empty</p>
              <Link 
                href="/shop"
                className="inline-block mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-3xl">{item.image}</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-bengali">{item.nameBn}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-semibold text-green-600">
                          ৳{item.price * item.quantity}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.id, item.quantity - 1);
                              } else {
                                removeItem(item.id);
                              }
                            }}
                            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-green-500 hover:bg-green-50 rounded transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer - Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">৳{totalPrice}</span>
            </div>
            
            {/* Delivery */}
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-gray-500">Delivery</span>
              <span className="text-green-600 font-medium">
                {totalPrice >= 500 ? 'Free' : '৳50'}
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-green-600">
                ৳{totalPrice + (totalPrice >= 500 ? 0 : 50)}
              </span>
            </div>

            {/* Free Delivery Progress */}
            {totalPrice < 500 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Add ৳{500 - totalPrice} for free delivery</span>
                  <span>{Math.round((totalPrice / 500) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((totalPrice / 500) * 100, 100)}%` }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Checkout Button */}
            <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}