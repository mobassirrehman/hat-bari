"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Fatima Ahmed",
      location: "Dhanmondi, Dhaka",
      rating: 5,
      text: "হাটবাড়ি থেকে শপিং করে অনেক খুশি! প্রোডাক্ট সবসময় ফ্রেশ থাকে এবং ডেলিভারি খুব দ্রুত হয়।",
      avatar: "👩",
    },
    {
      id: 2,
      name: "Rahim Uddin",
      location: "Uttara, Dhaka",
      rating: 5,
      text: "Best online grocery shop in Dhaka! The vegetables are always fresh and prices are reasonable.",
      avatar: "👨",
    },
    {
      id: 3,
      name: "Nasrin Begum",
      location: "Mirpur, Dhaka",
      rating: 4,
      text: "খুব ভালো সার্ভিস। বাসায় বসেই সব কেনাকাটা করতে পারি। সময় অনেক বাঁচে।",
      avatar: "👩‍🦱",
    },
    {
      id: 4,
      name: "Kamal Hossain",
      location: "Gulshan, Dhaka",
      rating: 5,
      text: "Excellent quality products! Their fish and meat section is amazing. Customer service is also very helpful.",
      avatar: "👨‍🦳",
    },
    {
      id: 5,
      name: "Sultana Razia",
      location: "Bashundhara, Dhaka",
      rating: 5,
      text: "ডেইলি ডিলস অনেক ভালো পাই। প্রতিদিনই কিছু না কিছু অফার থাকে।",
      avatar: "👩‍🦰",
    },
    {
      id: 6,
      name: "Jamal Khan",
      location: "Banani, Dhaka",
      rating: 4,
      text: "Very convenient shopping experience. App is easy to use and delivery is always on time.",
      avatar: "🧔",
    },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-green-600 font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            <span className="font-bengali">গ্রাহকদের মতামত</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our happy customers have to say about their shopping
            experience with হাটবাড়ি
          </p>
        </motion.div>
      </div>

      {/* Testimonials Marquee */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee Container */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 w-fit"
        >
          {/* Duplicate testimonials for seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="w-[340px] shrink-0"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full shadow-sm">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-green-200 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{testimonial.avatar}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
