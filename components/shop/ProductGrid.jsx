"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  ChevronDown,
} from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Sample products data (will be fetched from API later)
  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      nameBn: "টমেটো",
      price: 60,
      originalPrice: 80,
      image: "🍅",
      rating: 4.5,
      reviews: 24,
      badge: "Sale",
      category: "vegetables",
    },
    {
      id: 2,
      name: "Green Spinach",
      nameBn: "পালং শাক",
      price: 30,
      image: "🥬",
      rating: 4.8,
      reviews: 42,
      badge: "Fresh",
      category: "vegetables",
    },
    {
      id: 3,
      name: "Organic Bananas",
      nameBn: "কলা",
      price: 80,
      image: "🍌",
      rating: 4.6,
      reviews: 35,
      category: "fruits",
    },
    {
      id: 4,
      name: "Farm Eggs (12pc)",
      nameBn: "ডিম",
      price: 140,
      originalPrice: 160,
      image: "🥚",
      rating: 4.9,
      reviews: 67,
      badge: "Best Seller",
      category: "dairy",
    },
    {
      id: 5,
      name: "Fresh Milk (1L)",
      nameBn: "দুধ",
      price: 75,
      image: "🥛",
      rating: 4.7,
      reviews: 53,
      category: "dairy",
    },
    {
      id: 6,
      name: "Red Onions (1kg)",
      nameBn: "পেঁয়াজ",
      price: 45,
      image: "🧅",
      rating: 4.4,
      reviews: 28,
      category: "vegetables",
    },
    {
      id: 7,
      name: "Chicken Breast",
      nameBn: "মুরগির মাংস",
      price: 280,
      originalPrice: 320,
      image: "🍗",
      rating: 4.6,
      reviews: 45,
      badge: "Sale",
      category: "meat",
    },
    {
      id: 8,
      name: "Whole Wheat Bread",
      nameBn: "পাউরুটি",
      price: 55,
      image: "🍞",
      rating: 4.5,
      reviews: 31,
      category: "bakery",
    },
    {
      id: 9,
      name: "Premium Mangoes",
      nameBn: "আম",
      price: 150,
      originalPrice: 200,
      image: "🥭",
      rating: 4.8,
      reviews: 89,
      badge: "Sale",
      category: "fruits",
    },
    {
      id: 10,
      name: "Fresh Potatoes",
      nameBn: "আলু",
      price: 35,
      image: "🥔",
      rating: 4.3,
      reviews: 56,
      category: "vegetables",
    },
    {
      id: 11,
      name: "Hilsha Fish",
      nameBn: "ইলিশ মাছ",
      price: 1200,
      originalPrice: 1500,
      image: "🐟",
      rating: 4.9,
      reviews: 34,
      badge: "Premium",
      category: "meat",
    },
    {
      id: 12,
      name: "Orange Juice",
      nameBn: "কমলার জুস",
      price: 120,
      image: "🧃",
      rating: 4.4,
      reviews: 22,
      badge: "New",
      category: "beverages",
    },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameBn.includes(searchQuery)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return b.reviews - a.reviews;
      }
    });

  return (
    <div className="space-y-4">
      {/* Top Bar: Search, Sort, View Mode */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm
                       focus:outline-none focus:border-green-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:border-green-500 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        layout
        className={`grid gap-4 ${
          viewMode === "grid"
            ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🔍</span>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="text-center pt-4">
          <button className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}
