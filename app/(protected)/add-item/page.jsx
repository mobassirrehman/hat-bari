"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Package,
  DollarSign,
  Tag,
  FileText,
  Image,
  Save,
  X,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
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

  // Redirect if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="animate-spin text-4xl">⏳</span>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

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

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="text-gray-500 mt-1">
              Fill in the details to add a new product
            </p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6"
          >
            {/* Product Image Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: emoji }))
                    }
                    className={`w-12 h-12 text-2xl rounded-xl border-2 flex items-center justify-center transition-all
                      ${
                        formData.image === emoji
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name (English) *
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Fresh Tomatoes"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name (Bengali) *
                </label>
                <input
                  type="text"
                  name="nameBn"
                  value={formData.nameBn}
                  onChange={handleChange}
                  required
                  placeholder="e.g., টমেটো"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition-all font-bengali"
                />
              </div>
            </div>

            {/* Price Fields */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (৳) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="60"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (৳)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  min="0"
                  placeholder="80 (optional)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="50"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Category, Unit, Badge */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <div className="relative">
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white appearance-none cursor-pointer"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Badge
                </label>
                <div className="relative">
                  <select
                    name="badge"
                    value={formData.badge}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white appearance-none cursor-pointer"
                  >
                    {badges.map((badge) => (
                      <option key={badge} value={badge}>
                        {badge || "None"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Write a short description about the product..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Preview</p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-4xl border border-gray-200">
                  {formData.image}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {formData.name || "Product Name"}
                  </p>
                  <p className="text-sm text-gray-500 font-bengali">
                    {formData.nameBn || "বাংলা নাম"}
                  </p>
                  <p className="text-green-600 font-bold">
                    ৳{formData.price || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isSubmitting ? "Adding..." : "Add Product"}
              </button>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </>
  );
}
