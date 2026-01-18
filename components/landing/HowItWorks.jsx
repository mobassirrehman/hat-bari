"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, CreditCard, Truck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Browse Products",
      titleBn: "পণ্য খুঁজুন",
      description: "Search through our wide selection of fresh groceries.",
    },
    {
      number: "02",
      icon: ShoppingBag,
      title: "Add to Cart",
      titleBn: "কার্টে যোগ করুন",
      description: "Select your items and add them to your shopping cart.",
    },
    {
      number: "03",
      icon: CreditCard,
      title: "Checkout",
      titleBn: "পেমেন্ট করুন",
      description: "Choose your payment method - bKash, Nagad, or Card.",
    },
    {
      number: "04",
      icon: Truck,
      title: "Get Delivered",
      titleBn: "ডেলিভারি নিন",
      description: "Sit back! Your order will be delivered to your doorstep.",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary-600 font-bold tracking-wider uppercase text-xs mb-3 block">
            Easy Steps
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="font-bengali">কিভাবে অর্ডার করবেন?</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Shopping at{" "}
            <span className="font-bold text-primary-700">Hatbari</span> is
            simple. Follow these 4 steps to get fresh food instantly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Connector Line (Desktop Only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-gray-100 -z-10">
                    <div className="h-full bg-primary-100 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                )}

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary-100 hover:shadow-soft-xl transition-all duration-300 text-center h-full">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 mx-auto bg-primary-50 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-600 -rotate-3 group-hover:-rotate-6 transition-transform" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center border-4 border-white">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-primary-600 font-bengali font-medium mb-3 text-sm">
                    {step.titleBn}
                  </p>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
