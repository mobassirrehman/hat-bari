'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star, Flame, Clock, Heart } from 'lucide-react';

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    quickAccess: true,
  });

  const categories = [
    { id: 'all', name: 'All Products', nameBn: 'সকল পণ্য', icon: '🛒', count: 156 },
    { id: 'vegetables', name: 'Vegetables', nameBn: 'শাকসবজি', icon: '🥬', count: 45 },
    { id: 'fruits', name: 'Fruits', nameBn: 'ফলমূল', icon: '🍎', count: 32 },
    { id: 'dairy', name: 'Dairy', nameBn: 'দুগ্ধজাত', icon: '🥛', count: 18 },
    { id: 'meat', name: 'Meat & Fish', nameBn: 'মাছ মাংস', icon: '🍖', count: 24 },
    { id: 'bakery', name: 'Bakery', nameBn: 'বেকারি', icon: '🍞', count: 15 },
    { id: 'beverages', name: 'Beverages', nameBn: 'পানীয়', icon: '🧃', count: 28 },
    { id: 'snacks', name: 'Snacks', nameBn: 'স্ন্যাকস', icon: '🍪', count: 36 },
    { id: 'cleaning', name: 'Cleaning', nameBn: 'পরিষ্কারক', icon: '🧹', count: 22 },
  ];

  const quickAccess = [
    { id: 'deals', name: 'Daily Deals', icon: Flame, color: 'text-orange-500' },
    { id: 'new', name: 'New Arrivals', icon: Star, color: 'text-yellow-500' },
    { id: 'recent', name: 'Recently Viewed', icon: Clock, color: 'text-blue-500' },
    { id: 'wishlist', name: 'Wishlist', icon: Heart, color: 'text-red-500' },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="sticky top-20 space-y-4">
      {/* Categories Section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-semibold text-gray-800">Categories</h3>
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform ${
              expandedSections.categories ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        <motion.div
          initial={false}
          animate={{ height: expandedSections.categories ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="px-2 pb-3 space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{category.name}</p>
                  <p className="text-xs text-gray-500 font-bengali">{category.nameBn}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Price Range Section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-semibold text-gray-800">Price Range</h3>
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform ${
              expandedSections.price ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        <motion.div
          initial={false}
          animate={{ height: expandedSections.price ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">৳{priceRange[0]}</span>
              <span className="text-sm text-gray-600">৳{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex gap-2 mt-3">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-1/2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                className="w-1/2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Access Section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('quickAccess')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-semibold text-gray-800">Quick Access</h3>
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform ${
              expandedSections.quickAccess ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        <motion.div
          initial={false}
          animate={{ height: expandedSections.quickAccess ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="px-2 pb-3 space-y-1">
            {quickAccess.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}