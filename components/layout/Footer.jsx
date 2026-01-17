import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "About Us", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Vegetables", href: "/shop?category=vegetables" },
        { name: "Fruits", href: "/shop?category=fruits" },
        { name: "Dairy", href: "/shop?category=dairy" },
        { name: "Meat & Fish", href: "/shop?category=meat" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "My Account", href: "/login" },
        { name: "Order Tracking", href: "#" },
        { name: "Return Policy", href: "#" },
        { name: "FAQs", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">হা</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white font-bengali">
                  হাটবাড়ি
                </span>
                <span className="text-xs text-gray-500 block -mt-1">
                  HatBari
                </span>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 max-w-sm">
              আপনার বিশ্বস্ত সুপারশপ। Fresh groceries, daily essentials, and
              quality products delivered to your doorstep.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+880 1700-000000</span>
              </a>
              <a
                href="mailto:info@hatbari.com"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@hatbari.com</span>
              </a>
              <p className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} হাটবাড়ি (HatBari). All rights reserved.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-green-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-green-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-green-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
