import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 border-t border-gray-100 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Top Section: App Download & Support (Matches Supgor Reference) */}
        <div className="flex flex-col lg:flex-row justify-between items-center pb-12 border-b border-gray-100 gap-8">
          {/* App Buttons */}
          <div className="flex items-center gap-6">
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-lg">
                Download our app
              </h3>
              <p className="text-gray-500 text-sm">
                Get -10% Discount on first order
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
                <span className="text-xs text-left leading-tight">
                  <span className="block text-[10px] font-light">
                    Download on the
                  </span>
                  <span className="font-bold">App Store</span>
                </span>
              </button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
                <span className="text-xs text-left leading-tight">
                  <span className="block text-[10px] font-light">
                    GET IT ON
                  </span>
                  <span className="font-bold">Google Play</span>
                </span>
              </button>
            </div>
          </div>

          {/* Support Number */}
          <div className="flex items-center gap-4 bg-primary-50 px-6 py-3 rounded-full">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Call Anytime
              </p>
              <p className="text-xl font-bold text-gray-900">
                +880 1700-000000
              </p>
            </div>
          </div>
        </div>

        {/* Main Links Section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="text-2xl font-bold text-gray-900">Hatbari</span>
            </Link>
            <div className="text-sm text-gray-500 space-y-3">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                75 Hoel Trok Station Road,
                <br />
                Cardiff, UK
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                info@example.com
              </p>
            </div>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {[
            {
              header: "Get to Know Us",
              links: [
                "Careers",
                "About Hatbari",
                "Investor Relations",
                "Social Responsibility",
                "Store Locations",
              ],
            },
            {
              header: "Let Us Help You",
              links: [
                "Your Orders",
                "Shipping Rates",
                "Returns & Replacements",
                "Manage Content",
                "Help Center",
              ],
            },
            {
              header: "Make Money",
              links: [
                "Sell on Hatbari",
                "Sell Your Services",
                "Become an Affiliate",
                "Advertise Products",
                "Self-Publish",
              ],
            },
            {
              header: "For Buyers",
              links: [
                "FAQ",
                "Track Order",
                "Return Policy",
                "Flash Sales",
                "Gift Cards",
              ],
            },
          ].map((col) => (
            <div key={col.header}>
              <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">
                {col.header}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-500 hover:text-primary-600 text-sm transition-colors duration-200 block hover:translate-x-1 transform"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} ContestHub. Made by TheGrim. All rights
            reserved.
          </p>
          <div className="flex gap-4 grayscale opacity-60">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              className="h-4"
              alt="Visa"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              className="h-4"
              alt="Paypal"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              className="h-4"
              alt="Mastercard"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
