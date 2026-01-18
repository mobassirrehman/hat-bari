"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  Heart,
  Zap,
  MapPin,
  ChevronDown,
  Phone,
  LogOut,
  Package,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // New state for profile dropdown
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Bakery"];

  return (
    <header className="w-full bg-white z-50 sticky top-0 font-sans">
      {/* Top Bar */}
      <div className="bg-[#d4f54c] text-teal-900 py-2.5 text-xs sm:text-sm font-medium border-b border-[#c3e442]">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="flex items-center gap-2">
            <span className="bg-teal-800 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
              NEW
            </span>
            <span>Welcome to HatBari Online Grocery Store!</span>
          </p>
          <div className="hidden md:flex items-center gap-6 text-teal-900/80">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>+880 1700-000000</span>
            </div>
            <div className="h-3 w-[1px] bg-teal-900/20"></div>
            <Link
              href="/profile"
              className="hover:text-teal-950 transition-colors"
            >
              Order Tracking
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-100 py-5 lg:py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 lg:gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 bg-teal-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              <span className="">🍊</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-gray-900 leading-none">
                  HatBari
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                  Grocery
                </span>
              </div>
            </Link>

            {/* Search Bar (Functional) */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="w-full relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for milk, vegetables..."
                  className="w-full bg-gray-100/80 border border-transparent focus:border-teal-200 rounded-full py-3.5 pl-6 pr-14 text-gray-700 font-medium focus:bg-white focus:ring-4 focus:ring-teal-50 transition-all outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center text-white hover:bg-teal-800 transition-all hover:scale-105"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Icons (Profile Logic Fixed) */}
            <div className="flex items-center gap-3 sm:gap-4 ml-auto shrink-0 relative">
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-11 h-11 rounded-full border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all flex items-center justify-center text-teal-700 font-bold bg-teal-50">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt="User"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        session.user?.name?.charAt(0).toUpperCase()
                      )}
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-14 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-50 mb-2">
                        <p className="font-bold text-sm text-gray-900 truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-teal-600"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-teal-600"
                      >
                        <Package className="w-4 h-4" /> My Orders
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left mt-1"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex flex-col items-center justify-center w-11 h-11 rounded-full border border-gray-200 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all text-gray-600"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              <Link href="/cart" className="flex items-center gap-3 group">
                <div className="relative w-11 h-11 rounded-full bg-teal-50 border border-teal-100 group-hover:bg-teal-100 transition-all flex items-center justify-center text-teal-700">
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:block border-b border-gray-100 bg-white">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm font-bold text-gray-600">
              {/* Browse Categories Dropdown */}
              <div className="relative group py-3 pr-6">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-3 bg-teal-700 text-white px-5 py-2.5 rounded-full hover:bg-teal-800 transition-all shadow-md shadow-teal-700/20"
                >
                  <Menu className="w-4 h-4" />
                  <span>Browse Categories</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/shop?category=${cat}`}
                      className="block px-5 py-2.5 text-gray-600 hover:bg-teal-50 hover:text-teal-700 hover:pl-7 transition-all"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Functional Main Links */}
              <nav className="flex items-center gap-6 ml-4">
                <Link
                  href="/"
                  className="py-4 hover:text-teal-600 font-semibold"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="py-4 hover:text-teal-600 font-semibold"
                >
                  Shop
                </Link>
                <Link
                  href="/shop?category=Vegetables"
                  className="py-4 hover:text-teal-600 font-semibold"
                >
                  Vegetables
                </Link>
                <Link
                  href="/shop?category=Fruits"
                  className="py-4 hover:text-teal-600 font-semibold"
                >
                  Fruits
                </Link>
                <Link
                  href="/shop?category=Dairy"
                  className="py-4 hover:text-teal-600 font-semibold"
                >
                  Dairy
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full">
              <Zap className="w-4 h-4 fill-orange-600" />
              <span>Best Seller</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
