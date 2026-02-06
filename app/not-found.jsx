"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBasket, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Animated Icon */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, delay: 0.2, repeat: 2, repeatDelay: 3 }}
          className="relative w-32 h-32 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-xl shadow-gray-200/50"
        >
          <ShoppingBasket className="w-16 h-16 text-gray-300" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 text-6xl"
          >
            🍋
          </motion.div>
        </motion.div>

        {/* 404 Text */}
        <h1 className="text-8xl font-black text-gray-200 mb-2">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          This aisle is empty!
        </h2>
        <p className="text-gray-500 mb-8 text-lg">
          The vegetable you are looking for has either been moved or eaten.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-teal-700/20"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-xl font-bold transition-all"
          >
            <ShoppingBasket className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
