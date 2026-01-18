"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  RotateCcw,
  HeadphonesIcon,
  Award,
  Lock,
} from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Receive your order anywhere in the world",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Shield,
      title: "Payment Security",
      description: "Don't worry, all orders are processed securely",
      color: "bg-primary-100 text-primary-600",
    },
    {
      icon: RotateCcw,
      title: "Return Policy",
      description: "Talk to our experts by chat or e-mail",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: HeadphonesIcon,
      title: "Free Shipping",
      description: "Collect points and enjoy a host of benefits!",
      color: "bg-secondary-100 text-secondary-600",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="group">
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
                  <div
                    className={`w-14 h-14 ${badge.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {badge.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
