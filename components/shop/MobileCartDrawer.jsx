"use client";

import { X, Plus, Minus, Trash2 } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
export default function MobileCartDrawer() {
  const {
    items,
    isOpen,
    toggleCart,
    removeItem,
    updateQuantity,
    getCartTotal,
  } = useCartStore();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">
              Your Cart ({items.length})
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p>Your cart is empty.</p>
                <button
                  onClick={toggleCart}
                  className="mt-4 text-teal-600 font-bold hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 border-b border-gray-100 pb-4"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                    {/* If you have images, use <Image> tag here. Using emoji for now based on your data */}
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-teal-600">
                        ৳{item.price * item.quantity}
                      </p>

                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="p-1 hover:text-red-500"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="p-1 hover:text-green-500"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-gray-400 hover:text-red-500 self-start"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Total Amount</span>
                <span className="text-2xl font-black text-teal-700">
                  ৳{getCartTotal()}
                </span>
              </div>
              <button className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
