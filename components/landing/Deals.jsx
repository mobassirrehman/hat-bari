"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export default function Deals() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setTimeLeft({
      hours: 23,
      minutes: 59,
      seconds: 59,
    });

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (!prev) return prev;
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
      nameBn: "আম",
      price: 150,
      originalPrice: 250,
      discount: 40,
      image: "🥭",
    },
    {
      id: 102,
      name: "Hilsha Fish",
      nameBn: "ইলিশ মাছ",
      price: 1200,
      originalPrice: 1500,
      discount: 20,
      image: "🐟",
    },
    {
      id: 103,
      name: "Organic Rice",
      nameBn: "চাল",
      price: 85,
      originalPrice: 110,
      discount: 23,
      image: "🍚",
    },
  ];

  const formatPrice = (price) => `৳${price}`;

  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Deal Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
              <Clock className="w-4 h-4" />
              Limited Time Offer
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="font-bengali">আজকের বিশেষ অফার</span>
              <br />
              <span>Daily Deals</span>
            </h2>

            <p className="text-white/80 mb-8 max-w-md">
              Don&apos;t miss out on our amazing daily deals! Fresh products at
              unbeatable prices. Hurry, offers end soon!
            </p>

            {/* Countdown Timer */}
            <div className="flex gap-4 mb-8">
              {[
                { value: timeLeft?.hours ?? 0, label: "Hours" },
                { value: timeLeft?.minutes ?? 0, label: "Minutes" },
                { value: timeLeft?.seconds ?? 0, label: "Seconds" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-2">
                    <span className="text-2xl sm:text-3xl font-bold">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs text-white/70">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/shop?deals=true"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              View All Deals
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right: Deal Products */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-4"
          >
            {dealProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/shop/${product.id}`}>
                  <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur rounded-2xl hover:bg-white/20 transition-colors group">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-5xl group-hover:scale-110 transition-transform">
                        {product.image}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-white/70 font-bengali">
                        {product.nameBn}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-white/50 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Discount Badge */}
                    <div className="shrink-0">
                      <span className="inline-block px-3 py-1 bg-white text-orange-600 rounded-lg font-bold text-sm">
                        -{product.discount}%
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
