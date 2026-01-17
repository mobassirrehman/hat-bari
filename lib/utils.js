// ================================
// UTILITY FUNCTIONS
// ================================
// These are helper functions used throughout the app

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() - Class Name Utility
 * ================================
 * Combines clsx and tailwind-merge for better class handling
 *
 * What it does:
 * 1. clsx: Conditionally joins class names
 *    clsx('text-red', isActive && 'bg-blue') → 'text-red bg-blue' (if isActive)
 *
 * 2. twMerge: Removes conflicting Tailwind classes
 *    twMerge('px-2 px-4') → 'px-4' (last one wins)
 *
 * Usage:
 * cn('base-class', condition && 'conditional-class', props.className)
 *
 * Example:
 * <div className={cn('p-4 bg-white', isActive && 'bg-blue-500', className)}>
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * formatPrice() - Format price in Bangladeshi Taka
 * ================================
 * @param {number} price - The price to format
 * @returns {string} - Formatted price with ৳ symbol
 *
 * Example:
 * formatPrice(1500) → '৳১,৫০০' (Bengali numerals)
 * formatPrice(1500, false) → '৳1,500' (English numerals)
 */
export function formatPrice(price, useBengaliNumerals = false) {
  if (useBengaliNumerals) {
    return `৳${price.toLocaleString("bn-BD")}`;
  }
  return `৳${price.toLocaleString("en-BD")}`;
}

/**
 * truncateText() - Truncate long text
 * ================================
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text with '...'
 *
 * Example:
 * truncateText('This is a very long text', 10) → 'This is a...'
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * generateId() - Generate unique ID
 * ================================
 * @returns {string} - Random ID string
 *
 * Example:
 * generateId() → 'abc123x'
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * sleep() - Delay execution (useful for testing loading states)
 * ================================
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} - Resolves after delay
 *
 * Example:
 * await sleep(1000); // Wait 1 second
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * debounce() - Limit function calls
 * ================================
 * Useful for search inputs - waits until user stops typing
 *
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} - Debounced function
 *
 * Example:
 * const debouncedSearch = debounce(handleSearch, 300);
 * <input onChange={debouncedSearch} />
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
