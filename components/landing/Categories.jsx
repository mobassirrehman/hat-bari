"use client";

import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const res = await fetch("http://localhost:5000/api/categories");

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch categories");
  }

  return res.json();
};

export default function Categories() {
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const getColors = (index) => {
    const colors = [
      { bg: "bg-green-50", border: "group-hover:border-green-200" },
      { bg: "bg-red-50", border: "group-hover:border-red-200" },
      { bg: "bg-blue-50", border: "group-hover:border-blue-200" },
      { bg: "bg-orange-50", border: "group-hover:border-orange-200" },
      { bg: "bg-amber-50", border: "group-hover:border-amber-200" },
      { bg: "bg-purple-50", border: "group-hover:border-purple-200" },
      { bg: "bg-yellow-50", border: "group-hover:border-yellow-200" },
      { bg: "bg-cyan-50", border: "group-hover:border-cyan-200" },
    ];
    return colors[index % colors.length];
  };

  if (isLoading)
    return (
      <div className="py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Loading departments...</p>
      </div>
    );

  if (isError)
    return (
      <div className="py-20 text-center bg-red-50 mx-4 rounded-xl border border-red-100">
        <p className="text-red-500 font-bold mb-2">Error loading categories</p>
        <p className="text-sm text-red-400 mb-4">{error.message}</p>
        <p className="text-xs text-gray-500">
          Ensure Backend is running on port 5000
        </p>
      </div>
    );

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end gap-4 mb-10 border-b border-gray-100 pb-6"
        >
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-2">
              <LayoutGrid className="w-4 h-4" />
              <span>Browse Categories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Shop by <span className="text-teal-600">Department</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-bold text-gray-500 hover:text-teal-600 transition-colors flex items-center gap-1 group"
          >
            View All Categories{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const style = getColors(index);
            return (
              <Link
                href={`/shop?category=${category.name}`}
                key={category._id || category.name || index}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className={`group h-full bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 cursor-pointer ${style.border}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 ${style.bg} rounded-full flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 group-hover:text-teal-700 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium mt-0.5 font-bengali">
                          {category.nameBn} • {category.count} Products
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
