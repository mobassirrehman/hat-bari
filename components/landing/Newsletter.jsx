"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Subscribed!");
        setSubscribed(true);
        setEmail("");
      } else {
        toast.error(data.error || "Failed to subscribe");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-primary-900 px-6 py-16 md:px-16 md:py-20 text-center"
        >
          {/* Abstract Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-8 border border-white/10 backdrop-blur-sm">
              <Mail className="w-4 h-4" />
              <span>Weekly Updates</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Join the <span className="text-primary-200">Hatbari</span> Club!
              <span className="block text-2xl md:text-4xl mt-2 font-bengali font-normal text-gray-300">
                নিউজলেটার সাবস্ক্রাইব করুন
              </span>
            </h2>

            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Get exclusive offers, new product updates, and fresh deals
              delivered straight to your inbox every week.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-3 text-green-300 text-lg font-medium">
                <CheckCircle className="w-6 h-6" />
                <span>You&apos;re subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address..."
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 bg-white border-0 outline-none focus:ring-2 focus:ring-primary-300 transition-all placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="mt-6 text-sm text-gray-400">
              By subscribing you agree to our{" "}
              <a
                href="#"
                className="text-white underline decoration-gray-500 underline-offset-4"
              >
                Terms & Conditions
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
