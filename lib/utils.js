import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price, useBengaliNumerals = false) {
  if (useBengaliNumerals) {
    return `৳${price.toLocaleString("bn-BD")}`;
  }
  return `৳${price.toLocaleString("en-BD")}`;
}

export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
