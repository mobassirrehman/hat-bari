"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Heart, Star, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, items, updateQuantity, removeItem } = useCartStore();

  // Check if product is in cart
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-green-300 hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative bg-gray-50 p-4 flex items-center justify-center aspect-square">
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-lg
            ${
              product.badge === "Sale"
                ? "bg-orange-500 text-white"
                : product.badge === "Fresh"
                ? "bg-green-500 text-white"
                : product.badge === "New"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Discount Badge */}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 ${
            product.originalPrice ? "right-16" : "right-3"
          } w-8 h-8 rounded-full 
                     flex items-center justify-center opacity-0 group-hover:opacity-100
                     transition-all duration-300 ${
                       isWishlisted
                         ? "bg-red-50 text-red-500"
                         : "bg-white text-gray-400 hover:text-red-500 hover:bg-red-50"
                     }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Product Image */}
        <Link href={`/shop/${product.id}`} className="block">
          <span className="text-7xl group-hover:scale-110 transition-transform duration-300 block">
            {product.image}
          </span>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Name */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-medium text-gray-800 hover:text-green-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 font-bengali">{product.nameBn}</p>

        {/* Price & Cart */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-bold text-lg text-gray-900">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart / Quantity Controls */}
          {quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-10 h-10 bg-green-50 hover:bg-green-500 text-green-600 
                       hover:text-white rounded-xl flex items-center justify-center
                       transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          ) : (
            <div className="flex items-center gap-1 bg-green-50 rounded-xl p-1">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-100 rounded-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold text-green-700">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-100 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
