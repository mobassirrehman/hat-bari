"use client";

import useCartStore from "@/store/useCartStore";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ item }) {
  const { addItem, toggleCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Stop link navigation if card is wrapped in Link
    e.stopPropagation();
    addItem(item);
    toggleCart(); // Optional: Open drawer immediately when adding
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all group relative">
      {/* Badge */}
      {item.badge && (
        <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
          {item.badge}
        </span>
      )}

      {/* Image Area */}
      <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform duration-300">
        {item.image}
      </div>

      {/* Details */}
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
            ★ {item.rating}
          </div>
        </div>
        <p className="text-xs text-gray-500 font-bengali mb-3">{item.nameBn}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {item.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ৳{item.originalPrice}
              </span>
            )}
            <span className="text-lg font-black text-teal-700">
              ৳{item.price}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-700 hover:bg-teal-600 hover:text-white transition-colors"
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
