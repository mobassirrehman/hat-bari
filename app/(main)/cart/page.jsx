"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const subtotal =
    items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
  const shipping = subtotal > 100 ? 0 : 60; // Free shipping logic
  const total = subtotal + shipping;

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  // Empty Cart State
  if (!items || items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-teal-700/20"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
                {item.image}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.nameBn}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 active:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 active:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="font-bold text-teal-700 text-lg">
                    ৳{item.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-24">
            <h3 className="font-bold text-xl text-gray-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-bold text-green-600">
                  {shipping === 0 ? "Free" : `৳${shipping}`}
                </span>
              </div>
              <div className="h-px bg-gray-100 my-4"></div>
              <div className="flex justify-between text-xl font-black text-gray-900">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>

            <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 transition-all hover:scale-[1.02]">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Secure checkout provided by HatBari
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
