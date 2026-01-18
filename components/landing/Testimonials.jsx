"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Kamal Hossain",
    role: "Regular Customer",
    location: "Gulshan, Dhaka",
    rating: 5,
    text: "Excellent products! Their fish and meat section is amazing. Customer service is also very helpful.",
    initial: "K",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "Sultana Razia",
    role: "Verified Buyer",
    location: "Bashundhara, Dhaka",
    rating: 5,
    text: "Always fresh vegetables! Delivery is always on time and products are properly packed. Highly recommended.",
    initial: "S",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: 3,
    name: "Jamal Khan",
    role: "Food Blogger",
    location: "Banani, Dhaka",
    rating: 4,
    text: "Very convenient shopping experience. App is easy to use and delivery is always on time. Best in the city.",
    initial: "J",
    color: "bg-orange-100 text-orange-700",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-bengali">
            গ্রাহকদের মতামত
          </h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            See what our happy customers have to say about their shopping
            experience with Hatbari.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-soft-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              {/* Background Watermark */}
              <Quote className="absolute top-4 right-6 w-24 h-24 text-gray-50 opacity-50 rotate-12 -z-0" />

              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < item.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-8 text-lg mb-8 relative z-10">
                {item.text}
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${item.color}`}
                >
                  {item.initial}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
