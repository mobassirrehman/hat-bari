"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, Loader2, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import ProductCardSkeleton from "@/components/shop/ProductCardSkeleton";

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Dairy",
  "Meat",
  "Bakery",
  "Beverages",
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCartStore();

  // State
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState("popular");
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA FROM MONGODB
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        setProducts(data.items || data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Could not load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sync URL params
  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All");
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Update URL on interaction
  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    if (searchQuery) params.set("search", searchQuery);
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  // FILTER & SORT
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name?.toLowerCase().includes(q) || p.nameBn?.includes(q)
      );
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header & Controls */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                Shop Products
              </h1>
              <p className="text-sm text-gray-500">
                {isLoading
                  ? "Loading..."
                  : `${filteredProducts.length} fresh items found`}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 shrink-0">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 text-sm font-bold text-gray-700 rounded-lg px-3 py-2 cursor-pointer outline-none"
                >
                  <option value="popular">Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-teal-600" /> Categories
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === cat
                          ? "bg-teal-50 text-teal-700 font-bold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                      {activeCategory === cat && (
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            {isLoading ? (
              // ✅ REPLACED SPINNER WITH SKELETON GRID
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={product._id}
                      className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl transition-all group relative"
                    >
                      <span className="absolute top-3 left-3 bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">
                        {product.category}
                      </span>

                      <Link href={`/shop/${product._id}`}>
                        <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform cursor-pointer">
                          {product.image}
                        </div>
                      </Link>

                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-600">
                            ★ {product.rating || 4.5}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          {product.nameBn}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black text-teal-700">
                            ৳{product.price}
                          </span>
                          <button
                            onClick={() => {
                              addItem({ ...product, quantity: 1 });
                              toast.success(`Added ${product.name} to cart`);
                            }}
                            className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20 opacity-50">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-teal-600" />
          </div>
        }
      >
        <ShopContent />
      </Suspense>
      <Footer />
    </>
  );
}
