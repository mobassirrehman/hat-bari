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
} from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

export default function ItemDetailsPage() {
  const { id } = useParams(); // Get ID from URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  // 1. Fetch Real Data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product._id,
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: quantity, // Add specific quantity
    });
    toast.success("Added to cart");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="animate-spin text-4xl">⏳</span>
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
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
            className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl border border-gray-100 p-10 flex items-center justify-center relative"
            >
              {discount > 0 && (
                <span className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  -{discount}%
                </span>
              )}
              <div className="text-9xl">{product.image}</div>
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="text-teal-600 font-bold text-sm uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mt-1 mb-2">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-500 font-bengali">
                  {product.nameBn}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  <Star className="fill-current w-5 h-5" />
                </div>
                <span className="font-bold text-gray-900">
                  {product.rating}
                </span>
                <span className="text-gray-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-teal-700">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Quantity */}
                <div className="flex items-center bg-white border border-gray-200 rounded-xl px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-700/20"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>

                <button className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-900">
                    Fast Delivery
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-900">
                    100% Authentic
                  </p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-900">
                    Easy Returns
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
