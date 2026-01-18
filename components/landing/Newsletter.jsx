"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-primary-900 px-6 py-16 md:px-16 md:py-20 text-center"
        >
          {/* Abstract Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-8 border border-white/10 backdrop-blur-sm">
              <Mail className="w-4 h-4" />
              <span>Weekly Updates</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Join the <span className="text-primary-200">Hatbari</span> Club!
              <span className="block text-2xl md:text-4xl mt-2 font-bengali font-normal text-gray-300">
                নিউজলেটার সাবস্ক্রাইব করুন
              </span>
            </h2>

            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Welcome new contacts or share the latest news. Make your business
              look good in just a few clicks with our exclusive offers.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 bg-white border-0 outline-none focus:ring-2 focus:ring-primary-300 transition-all placeholder:text-gray-400"
              />
              <button className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-400">
              By subscribing you agree to our{" "}
              <a
                href="#"
                className="text-white underline decoration-gray-500 underline-offset-4"
              >
                Terms & Conditions
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
