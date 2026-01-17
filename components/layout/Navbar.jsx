"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const cartCount = getTotalItems();

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

          {/* Search Bar (Desktop) */}
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
            <Link
              href="/"
              className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium text-sm transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium text-sm transition-colors"
            >
              Shop
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* User Menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-sm font-medium max-w-24 truncate">
                    {session.user?.name?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-800 truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                      <Link
                        href="/add-item"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Product
                      </Link>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 
                         hover:bg-green-50 rounded-lg font-medium text-sm transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}

            {/* Cart Button */}
            <Link
              href="/shop"
              className="relative p-2.5 bg-green-50 text-green-600 hover:bg-green-100 
                       rounded-xl transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
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
                       ${isMobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"}`}
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
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl font-medium transition-colors"
            >
              Shop
            </Link>

            {session ? (
              <>
                <div className="px-4 py-2 border-t border-gray-100 mt-2">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="font-medium text-gray-800">
                    {session.user?.name}
                  </p>
                </div>
                <Link
                  href="/add-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
