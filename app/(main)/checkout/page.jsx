"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Phone,
  CreditCard,
  Truck,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dhaka",
    note: "",
  });

  const deliveryFee = getTotalPrice() >= 500 ? 0 : 50;
  const total = getTotalPrice() + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate order submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderId = "HB" + Date.now().toString().slice(-8);

      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="container-custom text-center">
            <span className="text-6xl mb-4 block">🛒</span>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-500 mb-6">Add some products to checkout</p>
            <button
              onClick={() => router.push("/shop")}
              className="btn-primary px-8 py-3"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-6">
        <div className="container-custom">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Delivery Info */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-500" />
                    Delivery Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="House, Road, Area"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      >
                        <option>Dhaka</option>
                        <option>Chittagong</option>
                        <option>Sylhet</option>
                        <option>Rajshahi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order Note (Optional)
                      </label>
                      <input
                        type="text"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Any special instructions"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-500" />
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    {[
                      {
                        id: "cod",
                        name: "Cash on Delivery",
                        icon: "💵",
                        desc: "Pay when you receive",
                      },
                      {
                        id: "bkash",
                        name: "bKash",
                        icon: "📱",
                        desc: "Mobile payment",
                      },
                      {
                        id: "nagad",
                        name: "Nagad",
                        icon: "📱",
                        desc: "Mobile payment",
                      },
                      {
                        id: "card",
                        name: "Card Payment",
                        icon: "💳",
                        desc: "Visa / Mastercard",
                      },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-2xl">{method.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {method.name}
                          </p>
                          <p className="text-sm text-gray-500">{method.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            paymentMethod === method.id
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {paymentMethod === method.id && (
                            <svg
                              className="w-full h-full text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button - Mobile */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="lg:hidden w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : `Place Order • ৳${total}`}
                </button>
              </motion.form>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{item.image}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ৳{item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ৳{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">৳{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span
                      className={
                        deliveryFee === 0 ? "text-green-600" : "text-gray-900"
                      }
                    >
                      {deliveryFee === 0 ? "Free" : `৳${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-green-600">৳{total}</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="hidden lg:flex w-full mt-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <ShieldCheck className="w-4 h-4" />
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
