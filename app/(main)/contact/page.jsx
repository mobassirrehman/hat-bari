"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Info */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-6">
            Get in touch
          </h1>
          <p className="text-gray-600 mb-10 text-lg">
            Have a question about your order or want to partner with us? We&apos;d
            love to hear from you.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phone</h3>
                <p className="text-gray-500">+880 1700-000000</p>
                <p className="text-sm text-gray-400">Mon-Fri from 8am to 5pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <p className="text-gray-500">support@hatbari.com</p>
                <p className="text-sm text-gray-400">We reply within 2 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Office</h3>
                <p className="text-gray-500">
                  Level 4, HatBari HQ
                  <br />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:bg-white outline-none transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:bg-white outline-none transition-all"
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                className="w-full h-32 p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:bg-white outline-none transition-all resize-none"
                placeholder="How can we help?"
              ></textarea>
            </div>
            <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
