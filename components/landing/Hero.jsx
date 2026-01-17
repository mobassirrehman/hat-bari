"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-green-50 via-white to-orange-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-green-500 rounded-full"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-orange-500 rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                🎉 Free delivery on orders over ৳500
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              <span className="font-bengali">আপনার পছন্দের</span>
              <br />
              <span className="text-green-600">Fresh Groceries</span>
              <br />
              <span className="font-bengali">এখন হাতের কাছে</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Quality vegetables, fresh fruits, dairy products and all your
              daily essentials delivered to your doorstep. Shop from হাটবাড়ি
              today!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/shop"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#categories"
                className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base"
              >
                Browse Categories
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Fast Delivery
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Secure Payment
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  24/7 Support
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-100 rounded-full" />

              {/* Hero image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[200px]">🛒</span>
              </div>

              {/* Floating product cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2,
                }}
                className="absolute -left-4 top-1/4 bg-white p-3 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🥬</span>
                  <div>
                    <p className="font-medium text-sm">Fresh Vegetables</p>
                    <p className="text-xs text-green-600">৳40/kg</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2.5,
                }}
                className="absolute -right-4 top-1/3 bg-white p-3 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🍎</span>
                  <div>
                    <p className="font-medium text-sm">Red Apples</p>
                    <p className="text-xs text-green-600">৳180/kg</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 3,
                }}
                className="absolute right-8 bottom-8 bg-white p-3 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🥛</span>
                  <div>
                    <p className="font-medium text-sm">Fresh Milk</p>
                    <p className="text-xs text-green-600">৳75/liter</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
