"use client";

import { Suspense } from "react";
import { Navbar, Footer } from "@/components/layout";
import Sidebar from "@/components/shop/Sidebar"; // Ensure you have this or use the code below
import ProductGrid from "@/components/shop/ProductGrid";
import FloatingCart from "@/components/shop/FloatingCart";

export default function ShopPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 pb-20">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-100 py-8 mb-8">
          <div className="container-custom">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Shop Our Products
            </h1>
            <p className="text-gray-500">
              Fresh groceries delivered to your door.
            </p>
          </div>
        </div>

        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar (Filters) - Hidden on Mobile */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-gray-900">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {[
                    "Vegetables",
                    "Fruits",
                    "Dairy",
                    "Meat",
                    "Bakery",
                    "Beverages",
                  ].map((cat) => (
                    <li key={cat}>
                      <a
                        href={`/shop?category=${cat}`}
                        className="flex items-center justify-between text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>{cat}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                          12
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Product Grid Area */}
            <div className="flex-1 w-full">
              <Suspense fallback={<div>Loading shop...</div>}>
                <ProductGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
