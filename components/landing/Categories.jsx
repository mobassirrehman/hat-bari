"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Categories() {
  const categories = [
    {
      name: "Vegetables",
      nameBn: "শাকসবজি",
      icon: "🥬",
      color: "bg-green-100",
      count: 45,
    },
    {
      name: "Fruits",
      nameBn: "ফলমূল",
      icon: "🍎",
      color: "bg-red-100",
      count: 32,
    },
    {
      name: "Dairy",
      nameBn: "দুগ্ধজাত",
      icon: "🥛",
      color: "bg-blue-100",
      count: 18,
    },
    {
      name: "Meat & Fish",
      nameBn: "মাছ মাংস",
      icon: "🍖",
      color: "bg-orange-100",
      count: 24,
    },
    {
      name: "Bakery",
      nameBn: "বেকারি",
      icon: "🍞",
      color: "bg-amber-100",
      count: 15,
    },
    {
      name: "Beverages",
      nameBn: "পানীয়",
      icon: "🧃",
      color: "bg-purple-100",
      count: 28,
    },
    {
      name: "Snacks",
      nameBn: "স্ন্যাকস",
      icon: "🍪",
      color: "bg-yellow-100",
      count: 36,
    },
    {
      name: "Cleaning",
      nameBn: "পরিষ্কারক",
      icon: "🧹",
      color: "bg-cyan-100",
      count: 22,
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
    <section id="categories" className="py-16 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-green-600 font-medium text-sm uppercase tracking-wider">
            Browse by Category
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            <span className="font-bengali">আমাদের ক্যাটাগরি</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of categories. From fresh vegetables to
            household essentials, we have everything you need.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <Link
                href={`/shop?category=${category.name.toLowerCase()}`}
                className="group block"
              >
                <div className="card p-6 text-center hover:border-green-300 transition-all duration-300">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4
                                group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-4xl">{category.icon}</span>
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-bengali">
                    {category.nameBn}
                  </p>

                  {/* Item Count */}
                  <p className="text-xs text-gray-400 mt-2">
                    {category.count} items
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
