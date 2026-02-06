"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Package, DollarSign, ChevronDown, Save, Loader2 } from "lucide-react";
import { Footer } from "@/components/layout";
import { toast } from "sonner";

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nameBn: "",
    price: "",
    originalPrice: "",
    category: "",
    description: "",
    unit: "kg",
    stock: "",
    badge: "",
    image: "🛒",
  });

  // ✅ FIX: Standard Next.js Redirect Pattern
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Fish",
    "Bakery",
    "Beverages",
    "Snacks",
    "Cleaning",
  ];
  const badges = ["", "Sale", "Fresh", "New", "Best Seller", "Premium"];
  const units = ["kg", "g", "liter", "ml", "pack", "piece", "dozen", "bundle"];
  const emojis = [
    "🍅",
    "🥬",
    "🍎",
    "🍌",
    "🥚",
    "🥛",
    "🧅",
    "🍗",
    "🍞",
    "🥭",
    "🥔",
    "🐟",
    "🧃",
    "🍪",
    "🧹",
    "🛒",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice
            ? parseFloat(formData.originalPrice)
            : null,
          stock: parseInt(formData.stock),
        }),
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        router.push("/shop");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. Loading State
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Checking authentication...</p>
      </div>
    );
  }

  // 2. Prevent content flash for unauthenticated users
  if (!session) return null;

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-3xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Add New Product
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Create a new item for your grocery catalog.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8"
          >
            {/* Emoji Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Product Icon
              </label>
              <div className="grid grid-cols-8 gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: emoji }))
                    }
                    className={`aspect-square text-2xl rounded-2xl border-2 flex items-center justify-center transition-all
                      ${
                        formData.image === emoji
                          ? "border-teal-500 bg-teal-50 scale-105"
                          : "border-gray-50 bg-gray-50 hover:border-gray-200"
                      }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Names */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Product Name (EN)
                </label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Green Spinach"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Product Name (BN)
                </label>
                <input
                  type="text"
                  name="nameBn"
                  value={formData.nameBn}
                  onChange={handleChange}
                  required
                  placeholder="পালং শাক"
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Pricing/Stock */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Price (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Old Price (৳)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-bold text-gray-700">
                  Stock Qty
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Dropdowns */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer"
                >
                  {units.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Badge</label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer"
                >
                  {badges.map((b) => (
                    <option key={b} value={b}>
                      {b || "No Badge"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all outline-none resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isSubmitting ? "Processing..." : "Add to Catalog"}
              </button>
            </div>
          </motion.form>
        </div>
      </main>
      <Footer />
    </>
  );
}
