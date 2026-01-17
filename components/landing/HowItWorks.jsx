"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, CreditCard, Truck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: "Browse Products",
      titleBn: "পণ্য খুঁজুন",
      description:
        "Search or browse through our wide selection of fresh groceries and daily essentials.",
    },
    {
      step: 2,
      icon: ShoppingBag,
      title: "Add to Cart",
      titleBn: "কার্টে যোগ করুন",
      description:
        "Select your items and add them to your shopping cart. Adjust quantities as needed.",
    },
    {
      step: 3,
      icon: CreditCard,
      title: "Checkout",
      titleBn: "পেমেন্ট করুন",
      description:
        "Choose your payment method - bKash, Nagad, card, or cash on delivery.",
    },
    {
      step: 4,
      icon: Truck,
      title: "Get Delivered",
      titleBn: "ডেলিভারি নিন",
      description:
        "Sit back and relax! Your order will be delivered fresh to your doorstep.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-green-600 font-medium text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            <span className="font-bengali">কিভাবে অর্ডার করবেন?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Shopping at হাটবাড়ি is easy! Just follow these simple steps to get
            your groceries delivered.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-green-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  {/* Step Circle */}
                  <div className="relative z-10 mx-auto mb-6">
                    <div
                      className="w-20 h-20 bg-white border-2 border-green-500 rounded-full 
                                  flex items-center justify-center mx-auto shadow-lg"
                    >
                      <Icon className="w-8 h-8 text-green-500" />
                    </div>
                    {/* Step Number */}
                    <span
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white 
                                   rounded-full flex items-center justify-center font-bold text-sm shadow-md"
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-green-600 font-bengali mb-3">
                    {item.titleBn}
                  </p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
