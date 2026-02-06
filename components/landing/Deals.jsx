"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const fetchDeals = async () => {
  const res = await fetch("/api/items?limit=6");
  if (!res.ok) throw new Error("Failed to fetch deals");
  const data = await res.json();
  const items = Array.isArray(data) ? data : data.items || [];
  // Filter to only items with a discount
  return items.filter((p) => p.originalPrice && p.originalPrice > p.price);
};

// Calculate time until midnight
function calcTimeLeft() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight - now;
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

export default function Deals() {
  const timeLeft = useCountdown();
  const { addItem } = useCartStore();

  const {
    data: dealProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deal-products"],
    queryFn: fetchDeals,
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
      <section className="py-16 bg-[#fff7ed]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
          <p className="text-gray-400 mt-3">Loading deals...</p>
        </div>
      </section>
    );
  }

  if (isError || !Array.isArray(dealProducts) || dealProducts.length === 0)
    return null;

  return (
    <section className="py-16 bg-[#fff7ed]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Limited Time Offer
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">
              Deals of the <span className="text-orange-500">Day</span>
            </h2>
            <p className="text-gray-500">
              {`Don't miss out on these limited time discounts.`}
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="flex gap-4">
            {[
              { value: timeLeft.hours, label: "Hrs" },
              { value: timeLeft.minutes, label: "Mins" },
              { value: timeLeft.seconds, label: "Secs" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-lg border border-orange-100 flex items-center justify-center mb-1">
                  <span className="text-2xl font-black text-gray-900">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {dealProducts.slice(0, 3).map((product, index) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            );

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-lg">
                    -{discount}%
                  </span>
                  <Link href={`/shop/${product._id}`}>
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                      {product.image}
                    </div>
                  </Link>
                </div>

                <div>
                  <Link href={`/shop/${product._id}`}>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-orange-600 transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 font-medium mb-3 font-bengali">
                    {product.nameBn}
                  </p>

                  <div className="flex items-end justify-between border-t border-gray-50 pt-4 mt-4">
                    <div>
                      <span className="text-xs text-gray-400 line-through font-medium block">
                        ৳{product.originalPrice}
                      </span>
                      <span className="text-xl font-black text-gray-900 block">
                        ৳{product.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm"
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
