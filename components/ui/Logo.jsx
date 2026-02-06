import { ShoppingBasket, Leaf } from "lucide-react";

export const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-3 group ${className}`}>
    <div className="relative w-11 h-11 bg-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-teal-200 group-hover:bg-teal-700 transition-colors duration-300">
      <ShoppingBasket
        className="w-6 h-6 text-white absolute bottom-2.5 left-2.5"
        strokeWidth={2.5}
      />
      <Leaf className="w-4 h-4 text-[#d4f54c] absolute top-2 right-2 fill-current rotate-12" />
    </div>

    <div className="flex flex-col justify-center">
      <span className="font-extrabold text-2xl tracking-tight text-gray-900 leading-none transition-colors">
        HatBari
      </span>
      <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mt-0.5 group-hover:text-orange-500 transition-colors">
        Grocery
      </span>
    </div>
  </div>
);
