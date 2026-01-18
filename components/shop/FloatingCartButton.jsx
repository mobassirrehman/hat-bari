"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import MobileCartDrawer from "./MobileCartDrawer";

export default function FloatingCartButton() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const cartCount = getTotalItems();

  if (cartCount === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Button - Mobile Only */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsDrawerOpen(true)}
        className="xl:hidden fixed bottom-6 right-6 w-16 h-16 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 transition-colors"
      >
        <ShoppingCart className="w-7 h-7" />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white"
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Cart Drawer */}
      <MobileCartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
