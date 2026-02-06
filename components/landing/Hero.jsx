"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Gift, Zap } from "lucide-react";

export default function Hero() {
  return (
    // ✅ FIX APPLIED: Added 'md:mb-32' to force a gap below the hero on tablets
    <section className="relative bg-[#fafafa] overflow-visible pt-8 pb-12 md:pb-24 md:mb-32 lg:pt-20 lg:pb-32 lg:mb-24">
      
      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 md:mb-0">
          
          {/* LEFT CONTENT */}
          <div className="relative z-20 pt-4 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full p-1.5 pr-5 mb-6 lg:mb-8 shadow-sm mx-auto lg:mx-0"
            >
              <span className="bg-[#d4f54c] text-teal-900 text-[10px] lg:text-xs font-bold px-3 py-1 rounded-full">
                New
              </span>
              <span className="text-xs lg:text-sm font-medium text-gray-600">
                Free shipping on your first order!
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-[5rem] font-black text-gray-900 leading-[1.1] mb-4 lg:mb-6 tracking-tight"
            >
              Fresh{" "}
              <span className="text-teal-700 relative inline-block">
                Grocery
                <svg
                  className="absolute w-full h-2 lg:h-3 -bottom-1 left-0 text-[#d4f54c]"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    opacity="0.6"
                  />
                </svg>
              </span>
              <br />
              Daily Essentials.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base lg:text-lg text-gray-500 mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              From farm to your table in minutes. Experience the freshest
              vegetables, fruits, and bakery items with HatBari.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/shop"
                className="w-auto min-w-[160px] bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-lg shadow-teal-700/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Shop Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              
              <Link
                href="/shop?sort=popular"
                className="w-auto min-w-[160px] bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-orange-500 text-orange-500" />
                Best Sellers
              </Link>
            </motion.div>
          </div>

          {/* RIGHT CONTENT - VISUAL */}
          <div className="relative h-[280px] md:h-[400px] lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-[#d4f54c]/30 to-transparent rounded-full blur-3xl opacity-60"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full max-w-xs lg:max-w-md"
            >
              <div className="relative bg-[#e6ceaa] w-56 lg:w-64 h-72 lg:h-80 mx-auto rounded-b-2xl shadow-2xl flex items-end justify-center overflow-visible">
                <div className="absolute inset-0 bg-black/5 rounded-b-2xl pointer-events-none"></div>
                <div className="absolute -top-12 lg:-top-16 left-2 lg:left-4 w-10 lg:w-12 h-32 lg:h-40 bg-green-500 rounded-full rotate-[-15deg] shadow-sm flex items-center justify-center border-4 border-white text-2xl">
                  🥖
                </div>
                <div className="absolute -top-8 lg:-top-10 right-6 lg:right-8 w-20 lg:w-24 h-20 lg:h-24 bg-red-500 rounded-full shadow-sm flex items-center justify-center border-4 border-white z-0 text-3xl lg:text-4xl">
                  🍎
                </div>
                <div className="absolute -top-16 lg:-top-20 left-1/2 -translate-x-1/2 w-16 lg:w-20 h-40 lg:h-48 bg-white border border-gray-200 rounded-lg rotate-[5deg] z-10 flex items-center justify-center shadow-md">
                  <span className="text-[10px] lg:text-xs font-bold text-blue-600 rotate-[-5deg]">
                    MILK
                  </span>
                </div>
                <div className="mb-8 lg:mb-12 text-center opacity-40 mix-blend-multiply">
                  <h3 className="font-black text-2xl lg:text-3xl tracking-tighter text-[#5c4033]">
                    HatBari
                  </h3>
                  <p className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest">
                    Fresh Market
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 lg:top-10 -right-2 lg:-right-10 bg-white p-2 lg:p-3 rounded-xl lg:rounded-2xl shadow-xl shadow-gray-200/50 flex items-center gap-2 lg:gap-3 pr-4 lg:pr-6"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm lg:text-base">
                  ৳
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-gray-400 font-bold uppercase">Price Drop</p>
                  <p className="font-bold text-xs lg:text-base text-gray-800">Fresh Veggies</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FLOATING CARDS */}
      <div className="relative md:absolute md:bottom-0 md:left-0 md:right-0 md:translate-y-1/2 px-4 lg:px-8 z-30 mt-8 md:mt-0 pb-8 md:pb-0">
        <div className="container mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 lg:p-10 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {[
                { icon: Truck, color: "text-blue-500", bg: "bg-blue-50", title: "Fast Shipping", desc: "Receive order in 24h" },
                { icon: RefreshCw, color: "text-orange-500", bg: "bg-orange-50", title: "Return Policy", desc: "Easy returns within 30d" },
                { icon: ShieldCheck, color: "text-teal-500", bg: "bg-teal-50", title: "Payment Security", desc: "100% secure payment" },
                { icon: Gift, color: "text-purple-500", bg: "bg-purple-50", title: "Free Shipping", desc: "On orders over $100" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 ${
                    i > 0 ? "pt-6 md:pt-0 md:pl-8" : ""
                  }`}
                >
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} shrink-0 transition-transform hover:scale-110`}>
                    <item.icon className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base lg:text-lg">{item.title}</h4>
                    <p className="text-xs lg:text-sm text-gray-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}