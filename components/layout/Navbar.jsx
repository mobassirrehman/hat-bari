"use client";

import { Logo } from "@/components/ui/Logo";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  ChevronDown,
  Phone,
  LogOut,
  X,
  Loader2,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  // Cart Logic
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const cartCount = mounted
    ? items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  // Search Logic
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  // Menus
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Menu State

  // Instant Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        setShowDropdown(true);
        try {
          const res = await fetch(`/api/items?search=${searchQuery}&limit=5`);
          const data = await res.json();
          setSearchResults(data.items || []);
        } catch (error) {
          console.error(error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setShowDropdown(false);
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Bakery"];
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white z-50 sticky top-0 font-sans shadow-sm">
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
      <div className="border-b border-gray-100 py-4 lg:py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 lg:gap-12 justify-between">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0 focus:outline-none">
              <Logo />
            </Link>

            {/* Desktop Search Bar */}
            <div
              className="hidden lg:flex flex-1 max-w-xl mx-auto relative"
              ref={searchRef}
            >
              <form
                onSubmit={handleSearchSubmit}
                className="w-full relative group"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() =>
                    searchQuery.length > 2 && setShowDropdown(true)
                  }
                  placeholder="Search for milk, vegetables..."
                  className="w-full bg-gray-100/80 border border-transparent focus:border-teal-200 rounded-full py-3.5 pl-6 pr-14 text-gray-700 font-medium focus:bg-white focus:ring-4 focus:ring-teal-50 transition-all outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center text-white hover:bg-teal-800 transition-all hover:scale-105"
                >
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
              </form>

              {/* Instant Search Results */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((product) => (
                        <li key={product._id}>
                          <Link
                            href={`/shop/${product._id}`}
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl shrink-0">
                              {product.image}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-sm line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-xs text-teal-600 font-bold">
                                ৳{product.price}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    !isSearching && (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No products found
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 relative">
              {/* User Profile */}
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all flex items-center justify-center text-teal-700 font-bold bg-teal-50 overflow-hidden">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        session.user?.name?.charAt(0).toUpperCase()
                      )}
                    </div>
                  </button>

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
                  className="flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all text-gray-600"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Cart Button */}
              <Link
                href="/cart"
                className="flex items-center gap-3 group relative"
              >
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-teal-50 border border-teal-100 group-hover:bg-teal-100 transition-all flex items-center justify-center text-teal-700">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE MENU (Visible when hamburger clicked) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top-2">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-gray-100 border border-transparent rounded-lg py-3 pl-4 pr-10 text-sm focus:bg-white focus:border-teal-500 outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between p-2 font-semibold text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Categories (Accordion style) */}
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                Categories
              </p>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/shop?category=${cat}`}
                  className="flex items-center justify-between p-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {cat}
                  <ChevronRight className="w-4 h-4 opacity-30" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation Links */}
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

              {/* ✅ CLEAN GENERIC LINKS */}
              <nav className="flex items-center gap-6 ml-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="py-4 hover:text-teal-600 font-semibold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
            {/* Removed Best Seller as requested */}
          </div>
        </div>
      </div>
    </header>
  );
}
