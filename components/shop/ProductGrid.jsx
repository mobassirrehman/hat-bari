"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "@/components/shop/ProductCardSkeleton";

export default function ProductGrid({ products, isLoading }) {
  const [viewMode, setViewMode] = useState("grid");

  //  HANDLING LOADING STATE
  if (isLoading) {
    return (
      <div
        className={`grid gap-4 ${
          viewMode === "grid"
            ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // EMPTY STATE
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 border-dashed">
        <span className="text-6xl mb-4 grayscale opacity-50">🥗</span>
        <h3 className="text-xl font-bold text-gray-900">No products found</h3>
        <p className="text-gray-500 text-sm">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="bg-white border border-gray-200 rounded-lg p-1 flex gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-all ${
              viewMode === "grid"
                ? "bg-teal-50 text-teal-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-all ${
              viewMode === "list"
                ? "bg-teal-50 text-teal-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <motion.div
        layout
        className={`grid gap-4 ${
          viewMode === "grid"
            ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {products.map((product, index) => (
          <motion.div
            layout
            key={product._id || product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard item={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
