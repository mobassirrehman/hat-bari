"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Zap } from "lucide-react";

export default function Deals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Timer logic... (Same as before)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = [
    {
      id: 101,
      name: "Premium Mangoes",
      nameBn: "রাজশাহী আম",
      price: 150,
      originalPrice: 250,
      discount: 40,
      image: "🥭",
      stock: 12,
    },
    {
      id: 102,
      name: "River Hilsha",
      nameBn: "পদ্মার ইলিশ",
      price: 1200,
      originalPrice: 1500,
      discount: 20,
      image: "🐟",
      stock: 5,
    },
    {
      id: 103,
      name: "Chinigura Rice",
      nameBn: "চিনিগুঁড়া চাল",
      price: 85,
      originalPrice: 110,
      discount: 23,
      image: "🍚",
      stock: 50,
    },
  ];

  return (
    <section className="py-16 bg-[#fff7ed]">
      {" "}
      {/* Very light orange background */}
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
              Don't miss out on these limited time discounts.
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
          {dealProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-lg">
                  -{product.discount}%
                </span>
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium mb-3">
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
                  <button className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Stock Bar */}
                <div className="mt-4 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-orange-500 h-full rounded-full"
                    style={{ width: `${(product.stock / 20) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1.5 font-bold">
                  Available:{" "}
                  <span className="text-orange-600">{product.stock}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
