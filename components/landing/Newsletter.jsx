"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");

    toast.success("Successfully subscribed! 🎉", {
      description: "You will receive our latest offers and updates.",
    });

    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Mail className="w-8 h-8" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            <span className="font-bengali">নিউজলেটার সাবস্ক্রাইব করুন</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 mb-8 max-w-xl mx-auto"
          >
            Subscribe to our newsletter and get exclusive offers, new product
            updates, and special discounts delivered to your inbox!
          </motion.p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-800 bg-white
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50
                         disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSubscribed}
              className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-medium
                       flex items-center justify-center gap-2 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Subscribing...
                </>
              ) : isSubscribed ? (
                <>
                  <Check className="w-5 h-5" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Subscribe
                </>
              )}
            </button>
          </motion.form>

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/60 text-sm mt-6"
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
