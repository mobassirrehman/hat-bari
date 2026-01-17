"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Phone,
  Copy,
  Home,
} from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { toast } from "sonner";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "HB00000000";
  const [copied, setCopied] = useState(false);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    toast.success("Order ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-gray-200 p-8 text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-500 mb-6">
              Thank you for shopping with হাটবাড়ি
            </p>

            {/* Order ID */}
            <div className="bg-gray-50 rounded-xl p-4 mb-8">
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-bold text-gray-900 font-mono">
                  {orderId}
                </span>
                <button
                  onClick={copyOrderId}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy
                    className={`w-4 h-4 ${
                      copied ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="text-left mb-8">
              <h2 className="font-semibold text-gray-900 mb-4">
                What happens next?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Package,
                    title: "Order Confirmed",
                    desc: "We have received your order",
                    active: true,
                  },
                  {
                    icon: Truck,
                    title: "Processing",
                    desc: "Your order is being prepared",
                    active: false,
                  },
                  {
                    icon: MapPin,
                    title: "Out for Delivery",
                    desc: "On the way to your address",
                    active: false,
                  },
                  {
                    icon: CheckCircle,
                    title: "Delivered",
                    desc: "Enjoy your fresh groceries!",
                    active: false,
                  },
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        step.active
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          step.active ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-green-50 rounded-xl p-4 mb-8 text-left">
              <p className="text-sm text-green-800 mb-2">
                <strong>Need help?</strong> Contact us anytime
              </p>
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2 text-green-600 font-medium"
              >
                <Phone className="w-4 h-4" />
                +880 1700-000000
              </a>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/profile/orders"
                className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
              >
                Track Order
              </Link>
              <Link
                href="/"
                className="flex-1 py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
