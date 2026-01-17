// app/(main)/shop/page.jsx
// Shop Page - Product listing with sidebar and filters
// URL: http://localhost:3000/shop

import { Navbar, Footer } from "@/components/layout";
import Sidebar from "@/components/shop/Sidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import FloatingCart from "@/components/shop/FloatingCart";

export const metadata = {
  title: "Shop - হাটবাড়ি | Browse Fresh Groceries",
  description:
    "Browse our wide selection of fresh vegetables, fruits, dairy, and daily essentials.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <div className="container-custom py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              <span className="font-bengali">আমাদের পণ্য</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Fresh groceries and daily essentials at the best prices
            </p>
          </div>

          {/* Main Layout: Sidebar + Products + Cart */}
          <div className="flex gap-6">
            {/* Left Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block w-64 shrink-0">
              <Sidebar />
            </aside>

            {/* Product Grid - Main content */}
            <div className="flex-1 min-w-0">
              <ProductGrid />
            </div>

            {/* Floating Cart - Hidden on mobile, shown on lg+ */}
            <aside className="hidden xl:block w-80 shrink-0">
              <FloatingCart />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
