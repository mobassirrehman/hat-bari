"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  ChevronDown,
} from "lucide-react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGrid() {
  const [products, setProducts] = useState([]); // Store fetched data
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // This calls your Next.js route -> Express -> MongoDB
        const res = await fetch(
          `/api/items?search=${searchQuery}&sort=${sortBy}`
        );
        const data = await res.json();

        // Ensure we set the array of items
        if (data.items) {
          setProducts(data.items);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, sortBy]);

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-soft">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:border-teal-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
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
      ) : (
        <motion.div
          layout
          className={`grid gap-4 ${
            viewMode === "grid"
              ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {products.length > 0 ? (
            products.map((product, index) => (
              <motion.div
                key={product._id || product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-xl font-semibold text-gray-800">
                No products found
              </h3>
              <p className="text-gray-600">
                Try searching for "Milk" or "Vegetables"
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
