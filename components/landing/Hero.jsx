"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Gift } from "lucide-react";

export default function Hero() {
  return (
    // Added lg:mb-32 to create space for the floating cards at the bottom
    <section className="relative bg-[#fafafa] overflow-visible pt-12 pb-12 lg:pt-20 lg:pb-32 lg:mb-24">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12 lg:mb-0">
          {/* LEFT CONTENT */}
          <div className="relative z-20 pt-4 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full p-1.5 pr-5 mb-8 shadow-sm mx-auto lg:mx-0"
            >
              <span className="bg-[#d4f54c] text-teal-900 text-xs font-bold px-3 py-1 rounded-full">
                New
              </span>
              <span className="text-sm font-medium text-gray-600">
                Free shipping on your first order!
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-[5rem] font-black text-gray-900 leading-[1.1] mb-6 tracking-tight"
            >
              Fresh{" "}
              <span className="text-teal-700 relative inline-block">
                Grocery
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-[#d4f54c]"
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
              className="text-lg text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              From farm to your table in minutes. Experience the freshest
              vegetables, fruits, and bakery items with HatBari.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-teal-700/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:-translate-y-1 transition-all flex items-center justify-center"
              >
                View Categories
              </Link>
            </motion.div>
          </div>

          {/* RIGHT CONTENT - VISUAL */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[600px] flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-[#d4f54c]/30 to-transparent rounded-full blur-3xl opacity-60"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full max-w-md"
            >
              <div className="relative bg-[#e6ceaa] w-64 h-80 mx-auto rounded-b-2xl shadow-2xl flex items-end justify-center overflow-visible">
                <div className="absolute inset-0 bg-black/5 rounded-b-2xl pointer-events-none"></div>
                <div className="absolute -top-16 left-4 w-12 h-40 bg-green-500 rounded-full rotate-[-15deg] shadow-sm flex items-center justify-center border-4 border-white text-2xl">
                  🥖
                </div>
                <div className="absolute -top-10 right-8 w-24 h-24 bg-red-500 rounded-full shadow-sm flex items-center justify-center border-4 border-white z-0 text-4xl">
                  🍎
                </div>
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-20 h-48 bg-white border border-gray-200 rounded-lg rotate-[5deg] z-10 flex items-center justify-center shadow-md">
                  <span className="text-xs font-bold text-blue-600 rotate-[-5deg]">
                    MILK
                  </span>
                </div>
                <div className="mb-12 text-center opacity-40 mix-blend-multiply">
                  <h3 className="font-black text-3xl tracking-tighter text-[#5c4033]">
                    HatBari
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Fresh Market
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-0 lg:-right-10 bg-white p-3 rounded-2xl shadow-xl shadow-gray-200/50 flex items-center gap-3 pr-6"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                  ৳
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Price Drop
                  </p>
                  <p className="font-bold text-gray-800">Fresh Veggies</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* RESPONSIVE FEATURE CARDS */}
        {/* On Mobile/Tablet: It sits naturally in the flow (relative) */}
        {/* On Desktop: It hangs at the bottom (absolute + translate-y-1/2) */}
        <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:translate-y-1/2 px-4 lg:px-8 z-30 mt-8 lg:mt-0">
          <div className="container mx-auto">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 lg:p-10 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {[
                  {
                    icon: Truck,
                    color: "text-blue-500",
                    bg: "bg-blue-50",
                    title: "Fast Shipping",
                    desc: "Receive order in 24h",
                  },
                  {
                    icon: RefreshCw,
                    color: "text-orange-500",
                    bg: "bg-orange-50",
                    title: "Return Policy",
                    desc: "Easy returns within 30d",
                  },
                  {
                    icon: ShieldCheck,
                    color: "text-teal-500",
                    bg: "bg-teal-50",
                    title: "Payment Security",
                    desc: "100% secure payment",
                  },
                  {
                    icon: Gift,
                    color: "text-purple-500",
                    bg: "bg-purple-50",
                    title: "Free Shipping",
                    desc: "On orders over $100",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 ${
                      i > 0 ? "pt-6 md:pt-0 md:pl-8" : ""
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} shrink-0 transition-transform hover:scale-110`}
                    >
                      <item.icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
