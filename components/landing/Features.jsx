"use client";

import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Leaf,
  CreditCard,
  HeadphonesIcon,
  RotateCcw,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      titleBn: "দ্রুত ডেলিভারি",
      description:
        "Same day delivery within Dhaka. Get your groceries within hours of ordering.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Leaf,
      title: "Fresh Products",
      titleBn: "তাজা পণ্য",
      description:
        "We source directly from farms. 100% fresh vegetables, fruits, and dairy.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      titleBn: "মান নিশ্চিত",
      description:
        "Every product is quality checked. Not satisfied? Get full refund.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      titleBn: "নিরাপদ পেমেন্ট",
      description:
        "Pay with bKash, Nagad, cards or cash on delivery. Your choice!",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      titleBn: "সার্বক্ষণিক সেবা",
      description: "Our support team is always ready to help. Call us anytime.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      titleBn: "সহজ রিটার্ন",
      description:
        "Not happy with your order? Return within 24 hours for full refund.",
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 bg-white">
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
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            <span className="font-bengali">কেন হাটবাড়ি?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;re committed to providing the best shopping experience with
            quality products and excellent service.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="group">
                <div className="card p-6 h-full hover:border-green-300 transition-all duration-300">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4
                                group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-green-600 font-bengali mb-3">
                    {feature.titleBn}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
