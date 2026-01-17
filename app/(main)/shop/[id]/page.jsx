"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Star,
  Plus,
  Minus,
  ChevronLeft,
  Truck,
  Shield,
  RotateCcw,
  Share2,
} from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { useCartStore } from "@/store/cartStore";

export default function ItemDetailsPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, items, updateQuantity } = useCartStore();

  // Sample product data (will be fetched from API later)
  const products = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      nameBn: "টমেটো",
      price: 60,
      originalPrice: 80,
      image: "🍅",
      rating: 4.5,
      reviews: 24,
      badge: "Sale",
      category: "Vegetables",
      description:
        "Fresh, ripe tomatoes sourced directly from local farms. Perfect for salads, cooking, and making sauces.",
      unit: "kg",
      stock: 50,
    },
    {
      id: "2",
      name: "Green Spinach",
      nameBn: "পালং শাক",
      price: 30,
      image: "🥬",
      rating: 4.8,
      reviews: 42,
      badge: "Fresh",
      category: "Vegetables",
      description:
        "Organic green spinach, freshly harvested. Rich in iron and vitamins.",
      unit: "bundle",
      stock: 30,
    },
    {
      id: "3",
      name: "Organic Bananas",
      nameBn: "কলা",
      price: 80,
      image: "🍌",
      rating: 4.6,
      reviews: 35,
      category: "Fruits",
      description:
        "Sweet and nutritious organic bananas. Great for breakfast or as a healthy snack.",
      unit: "dozen",
      stock: 45,
    },
    {
      id: "4",
      name: "Farm Eggs (12pc)",
      nameBn: "ডিম",
      price: 140,
      originalPrice: 160,
      image: "🥚",
      rating: 4.9,
      reviews: 67,
      badge: "Best Seller",
      category: "Dairy",
      description:
        "Farm-fresh eggs from free-range chickens. High in protein and omega-3.",
      unit: "pack",
      stock: 100,
    },
    {
      id: "5",
      name: "Fresh Milk (1L)",
      nameBn: "দুধ",
      price: 75,
      image: "🥛",
      rating: 4.7,
      reviews: 53,
      category: "Dairy",
      description:
        "Pure, pasteurized milk from healthy cows. No preservatives added.",
      unit: "liter",
      stock: 60,
    },
    {
      id: "6",
      name: "Red Onions (1kg)",
      nameBn: "পেঁয়াজ",
      price: 45,
      image: "🧅",
      rating: 4.4,
      reviews: 28,
      category: "Vegetables",
      description:
        "Premium quality red onions. Essential for everyday cooking.",
      unit: "kg",
      stock: 80,
    },
    {
      id: "7",
      name: "Chicken Breast",
      nameBn: "মুরগির মাংস",
      price: 280,
      originalPrice: 320,
      image: "🍗",
      rating: 4.6,
      reviews: 45,
      badge: "Sale",
      category: "Meat",
      description:
        "Fresh, boneless chicken breast. Lean protein for healthy meals.",
      unit: "kg",
      stock: 25,
    },
    {
      id: "8",
      name: "Whole Wheat Bread",
      nameBn: "পাউরুটি",
      price: 55,
      image: "🍞",
      rating: 4.5,
      reviews: 31,
      category: "Bakery",
      description:
        "Freshly baked whole wheat bread. High in fiber and nutrients.",
      unit: "pack",
      stock: 40,
    },
    {
      id: "9",
      name: "Premium Mangoes",
      nameBn: "আম",
      price: 150,
      originalPrice: 200,
      image: "🥭",
      rating: 4.8,
      reviews: 89,
      badge: "Sale",
      category: "Fruits",
      description: "Sweet and juicy Himsagar mangoes. The king of fruits!",
      unit: "kg",
      stock: 35,
    },
    {
      id: "10",
      name: "Fresh Potatoes",
      nameBn: "আলু",
      price: 35,
      image: "🥔",
      rating: 4.3,
      reviews: 56,
      category: "Vegetables",
      description: "Fresh potatoes perfect for curries, fries, and more.",
      unit: "kg",
      stock: 100,
    },
    {
      id: "11",
      name: "Hilsha Fish",
      nameBn: "ইলিশ মাছ",
      price: 1200,
      originalPrice: 1500,
      image: "🐟",
      rating: 4.9,
      reviews: 34,
      badge: "Premium",
      category: "Fish",
      description:
        "Premium Hilsha fish from Padma river. The national fish of Bangladesh.",
      unit: "kg",
      stock: 15,
    },
    {
      id: "12",
      name: "Orange Juice",
      nameBn: "কমলার জুস",
      price: 120,
      image: "🧃",
      rating: 4.4,
      reviews: 22,
      badge: "New",
      category: "Beverages",
      description:
        "100% pure orange juice with no added sugar. Refreshing and healthy.",
      unit: "liter",
      stock: 50,
    },
  ];

  const product = products.find((p) => p.id === params.id) || products[0];
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const cartItem = items.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-6">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-green-600">
              Shop
            </Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>

          {/* Back Button */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Shop
          </Link>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-gray-200 p-8"
            >
              <div className="relative aspect-square flex items-center justify-center bg-gray-50 rounded-xl">
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1.5 text-sm font-semibold rounded-lg
                    ${
                      product.badge === "Sale"
                        ? "bg-orange-500 text-white"
                        : product.badge === "Fresh"
                        ? "bg-green-500 text-white"
                        : product.badge === "Premium"
                        ? "bg-purple-500 text-white"
                        : product.badge === "New"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg">
                    -{discount}%
                  </span>
                )}
                <span className="text-[180px]">{product.image}</span>
              </div>
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category */}
              <span className="text-sm text-green-600 font-medium">
                {product.category}
              </span>

              {/* Name */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-500 font-bengali">
                  {product.nameBn}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  per {product.unit}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.stock > 10 ? "bg-green-500" : "bg-orange-500"
                  }`}
                ></span>
                <span className="text-sm text-gray-600">
                  {product.stock > 10
                    ? "In Stock"
                    : `Only ${product.stock} left`}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white rounded-lg transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3.5 px-6 rounded-xl font-semibold transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors
                    ${
                      isWishlisted
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>

                {/* Share */}
                <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Free Delivery</p>
                  <p className="text-xs text-gray-400">Orders over ৳500</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Quality Assured</p>
                  <p className="text-xs text-gray-400">100% Fresh</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Easy Returns</p>
                  <p className="text-xs text-gray-400">24 hour policy</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((item) => (
                  <Link key={item.id} href={`/shop/${item.id}`}>
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:border-green-300 hover:shadow-lg transition-all">
                      <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-xl mb-3">
                        <span className="text-5xl">{item.image}</span>
                      </div>
                      <h3 className="font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-bengali">
                        {item.nameBn}
                      </p>
                      <p className="font-bold text-green-600 mt-2">
                        ৳{item.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
