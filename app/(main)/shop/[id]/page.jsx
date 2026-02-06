"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Heart,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/layout"; // Adjust path if needed
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) throw new Error("Product fetch failed");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        // Don't show toast on 404 immediately to avoid spamming
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      _id: product._id, // Ensure this matches your store ID key
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-teal-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <span className="text-6xl mb-4">🤷‍♂️</span>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Product Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          We couldn&apos;t find the item you&apos;re looking for.
        </p>
        <Link href="/shop" className="btn-primary px-8 py-3 rounded-full">
          Back to Shop
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-teal-600">
              Home
            </Link>{" "}
            /
            <Link href="/shop" className="hover:text-teal-600">
              Shop
            </Link>{" "}
            /<span className="text-gray-800 font-medium">{product.name}</span>
          </nav>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-gray-100 p-8 lg:p-16 flex items-center justify-center relative shadow-sm"
            >
              {discount > 0 && (
                <span className="absolute top-6 left-6 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                  -{discount}% OFF
                </span>
              )}
              <div className="text-[8rem] lg:text-[10rem] drop-shadow-2xl filter transform hover:scale-110 transition-transform duration-500">
                {product.image}
              </div>
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <span className="text-teal-600 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full">
                  {product.category || "Grocery"}
                </span>
                <h1 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4 mb-2 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-500 font-medium">
                  {product.nameBn}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 4.5)
                          ? "fill-current"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900 ml-2">
                  {product.rating || 4.5}
                </span>
                <span className="text-gray-400 text-sm">
                  ({product.reviews || 128} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-4 p-6 bg-white rounded-2xl border border-gray-100 w-fit">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 font-medium line-through mb-1">
                    {product.originalPrice ? `৳${product.originalPrice}` : ""}
                  </span>
                  <span className="text-4xl font-black text-teal-700">
                    ৳{product.price}
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
                <span className="text-sm font-bold text-green-600 mb-2">
                  In Stock
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg max-w-md">
                {product.description ||
                  "Fresh and high-quality product sourced directly from local farmers. Perfect for your daily needs."}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                {/* Quantity */}
                <div className="flex items-center bg-white border border-gray-200 rounded-full px-2 py-1 w-fit shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-700/20 hover:scale-[1.02]"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>

                <button className="w-14 h-14 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50">
                  <Truck className="w-6 h-6 text-blue-500" />
                  <span className="text-sm font-bold text-gray-700">
                    Fast Delivery
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-50/50">
                  <Shield className="w-6 h-6 text-purple-500" />
                  <span className="text-sm font-bold text-gray-700">
                    Secure Payment
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
