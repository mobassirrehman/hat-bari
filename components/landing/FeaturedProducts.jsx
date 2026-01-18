"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { useState } from "react";

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState({});

  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      nameBn: "টমেটো",
      price: 60,
      originalPrice: 80,
      image: "🍅",
      rating: 4.5,
      discount: 25,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Green Spinach",
      nameBn: "পালং শাক",
      price: 30,
      image: "🥬",
      rating: 4.8,
      status: "Fresh",
    },
    {
      id: 3,
      name: "Organic Bananas",
      nameBn: "কলা",
      price: 80,
      image: "🍌",
      rating: 4.6,
      status: "Popular",
    },
    {
      id: 4,
      name: "Farm Eggs (1 Dozen)",
      nameBn: "ডিম (১ ডজন)",
      price: 140,
      originalPrice: 160,
      image: "🥚",
      rating: 4.9,
      discount: 12,
      status: "Sale",
    },
  
  ];

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-teal-600 font-bold tracking-wider text-xs uppercase mb-2 block">
            Top Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Featured Products
          </h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group overflow-hidden relative"
            >
              {/* Floating Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.discount && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    -{product.discount}%
                  </span>
                )}
                {product.status && !product.discount && (
                  <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    {product.status}
                  </span>
                )}
              </div>

              {/* Action Buttons (Right) */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
                    wishlist[product.id]
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-500 hover:bg-teal-500 hover:text-white"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist[product.id] ? "fill-current" : ""
                    }`}
                  />
                </button>
                <button className="w-9 h-9 rounded-full bg-white text-gray-500 flex items-center justify-center shadow-md hover:bg-teal-500 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Image Area */}
              <div className="h-56 bg-gray-50 flex items-center justify-center relative">
                <div className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                  {product.image}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">
                    ({product.rating})
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-1 hover:text-teal-600 transition-colors cursor-pointer truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{product.nameBn}</p>

                <div className="flex items-center justify-between">
                  <div>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through block">
                        ৳{product.originalPrice}
                      </span>
                    )}
                    <span className="text-lg font-bold text-teal-700">
                      ৳{product.price}
                    </span>
                  </div>
                  <button className="bg-gray-100 hover:bg-teal-600 hover:text-white text-gray-900 p-2.5 rounded-lg transition-all">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
