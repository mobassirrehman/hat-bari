"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted] = useState(() => typeof window !== "undefined");

  // Get cart total from Zustand store
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const cartCount = mounted ? getTotalItems() : 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">হা</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-gray-800 font-bengali">
                হাটবাড়ি
              </span>
              <span className="text-xs text-gray-400 block -mt-1">HatBari</span>
            </div>
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for groceries, vegetables, fruits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         focus:outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100
                         transition-all duration-200"
              />
            </div>
          </form>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg
                         font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 
                       hover:bg-green-50 rounded-lg font-medium text-sm transition-colors duration-200"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>

            {/* Cart Button */}
            <Link
              href="/shop"
              className="relative p-2.5 bg-green-50 text-green-600 hover:bg-green-100 
                       rounded-xl transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {/* Cart Count Badge - Now connected to Zustand */}
              <span
                className={`absolute -top-1 -right-1 w-5 h-5 text-white text-xs 
                            font-bold rounded-full flex items-center justify-center
                            ${cartCount > 0 ? "bg-orange-500" : "bg-gray-400"}`}
              >
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                       ${isMobileMenuOpen ? "max-h-80 pb-4" : "max-h-0"}`}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         focus:outline-none focus:border-green-500 focus:bg-white"
              />
            </div>
          </form>

          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 
                         rounded-xl font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 
                       rounded-xl font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
