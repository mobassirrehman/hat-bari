"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";
import { Navbar, Footer } from "@/components/layout";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");

  // Sample orders data
  const orders = [
    {
      id: "HB12345678",
      date: "2024-01-15",
      total: 450,
      status: "delivered",
      items: [
        { name: "Fresh Tomatoes", quantity: 2, image: "🍅" },
        { name: "Organic Bananas", quantity: 1, image: "🍌" },
      ],
    },
    {
      id: "HB12345679",
      date: "2024-01-17",
      total: 1280,
      status: "processing",
      items: [
        { name: "Hilsha Fish", quantity: 1, image: "🐟" },
        { name: "Farm Eggs", quantity: 2, image: "🥚" },
      ],
    },
    {
      id: "HB12345680",
      date: "2024-01-17",
      total: 320,
      status: "out_for_delivery",
      items: [
        { name: "Fresh Milk", quantity: 2, image: "🥛" },
        { name: "Whole Wheat Bread", quantity: 1, image: "🍞" },
      ],
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            <CheckCircle className="w-3 h-3" /> Delivered
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
            <Clock className="w-3 h-3" /> Processing
          </span>
        );
      case "out_for_delivery":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            <Truck className="w-3 h-3" /> Out for Delivery
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
            {status}
          </span>
        );
    }
  };

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-6">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold text-green-600">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <h2 className="font-semibold text-gray-900">
                    {session.user?.name}
                  </h2>
                  <p className="text-sm text-gray-500">{session.user?.email}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {[
                    { id: "orders", name: "My Orders", icon: Package },
                    { id: "addresses", name: "Addresses", icon: MapPin },
                    { id: "account", name: "Account Settings", icon: User },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        activeTab === item.id
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "orders" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h1 className="text-2xl font-bold text-gray-900">
                    My Orders
                  </h1>

                  {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                      <span className="text-5xl mb-4 block">📦</span>
                      <p className="text-gray-500">No orders yet</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl border border-gray-200 p-6"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Order #{order.id}
                            </p>
                            <p className="text-xs text-gray-400">
                              {order.date}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                            >
                              <span className="text-xl">{item.image}</span>
                              <span className="text-sm text-gray-600">
                                ×{item.quantity}
                              </span>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <span className="text-sm text-gray-500">
                              +{order.items.length - 2} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <p className="font-semibold text-gray-900">
                            Total: ৳{order.total}
                          </p>
                          <button className="flex items-center gap-1 text-green-600 font-medium hover:text-green-700">
                            View Details
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === "addresses" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Saved Addresses
                  </h1>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <p className="text-gray-500 text-center py-8">
                      No saved addresses yet
                    </p>
                    <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors">
                      + Add New Address
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "account" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Account Settings
                  </h1>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        defaultValue={session.user?.name || ""}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={session.user?.email || ""}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500"
                      />
                    </div>
                    <button className="btn-primary px-6 py-3">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
