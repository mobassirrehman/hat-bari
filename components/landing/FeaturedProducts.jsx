"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";

export default function FeaturedProducts() {
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
    },
    {
      id: 3,
      name: "Organic Bananas",
      nameBn: "কলা",
      price: 80,
      image: "🍌",
      rating: 4.6,
      reviews: 35,
    },
    {
      id: 4,
      name: "Farm Eggs",
      nameBn: "ডিম",
      price: 140,
      originalPrice: 160,
      image: "🥚",
      rating: 4.9,
      reviews: 67,
      badge: "Best Seller",
    },
    {
      id: 5,
      name: "Fresh Milk",
      nameBn: "দুধ",
      price: 75,
      image: "🥛",
      rating: 4.7,
      reviews: 53,
    },
    {
      id: 6,
      name: "Red Onions",
      nameBn: "পেঁয়াজ",
      price: 45,
      image: "🧅",
      rating: 4.4,
      reviews: 28,
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
    },
    {
      id: 8,
      name: "Whole Wheat Bread",
      nameBn: "পাউরুটি",
      price: 55,
      image: "🍞",
      rating: 4.5,
      reviews: 31,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const formatPrice = (price) => `৳${price}`;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">
              Top Picks
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              <span className="font-bengali">জনপ্রিয় পণ্য</span>
            </h2>
          </div>
          <Link href="/shop" className="btn-outline text-sm">
            View All Products
          </Link>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <div className="group card overflow-hidden">
                {/* Image Container */}
                <div className="relative bg-gray-50 p-6 flex items-center justify-center aspect-square">
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-lg
                      ${
                        product.badge === "Sale"
                          ? "bg-orange-500 text-white"
                          : product.badge === "Fresh"
                          ? "bg-green-500 text-white"
                          : "bg-gray-800 text-white"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-sm
                                   flex items-center justify-center opacity-0 group-hover:opacity-100
                                   hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                  >
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Product Image */}
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Name */}
                  <Link href={`/shop/${product.id}`}>
                    <h3 className="font-medium text-gray-800 hover:text-green-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 font-bengali">
                    {product.nameBn}
                  </p>

                  {/* Price & Cart */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      className="w-9 h-9 bg-green-50 hover:bg-green-500 text-green-600 
                                     hover:text-white rounded-lg flex items-center justify-center
                                     transition-colors duration-200"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
