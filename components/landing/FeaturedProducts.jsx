"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const fetchFeatured = async () => {
  const res = await fetch("/api/items?limit=4");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return Array.isArray(data) ? data : data.items || [];
};

export default function FeaturedProducts() {
  const { addItem } = useCartStore();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeatured,
    staleTime: 5 * 60 * 1000,
  });

  const handleAddToCart = (product) => {
    addItem({
      _id: product._id,
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
          <p className="text-gray-400 mt-3">Loading products...</p>
        </div>
      </section>
    );
  }

  if (isError || !Array.isArray(products) || products.length === 0) return null;

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
          {products.slice(0, 4).map((product, index) => {
            const discount = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : 0;

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group overflow-hidden relative"
              >
                {/* Badge */}
                {discount > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                      -{discount}%
                    </span>
                  </div>
                )}

                {/* Image Area */}
                <Link href={`/shop/${product._id}`}>
                  <div className="h-56 bg-gray-50 flex items-center justify-center relative cursor-pointer">
                    <div className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                      {product.image}
                    </div>
                  </div>
                </Link>

                {/* Content Area */}
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating || 4.5)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      ({product.rating || 4.5})
                    </span>
                  </div>

                  <Link href={`/shop/${product._id}`}>
                    <h3 className="font-bold text-gray-900 text-base mb-1 hover:text-teal-600 transition-colors cursor-pointer truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-4 font-bengali">
                    {product.nameBn}
                  </p>

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
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-gray-100 hover:bg-teal-600 hover:text-white text-gray-900 p-2.5 rounded-lg transition-all"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
