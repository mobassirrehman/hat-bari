"use client";

import { ShoppingBag } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCart() {
  const { getCartCount, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const count = getCartCount();

  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleCart}
        className="fixed bottom-6 right-6 z-50 bg-teal-700 text-white p-4 rounded-full shadow-2xl shadow-teal-900/40 flex items-center gap-3 border-2 border-white/20 backdrop-blur-sm"
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-teal-700">
            {count}
          </span>
        </div>
        <span className="font-bold hidden sm:inline pr-1">View Cart</span>
      </motion.button>
    </AnimatePresence>
  );
}