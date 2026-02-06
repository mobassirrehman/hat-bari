"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-6xl mb-4">😵</span>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        We encountered an unexpected error. Please try again or go back to the
        home page.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-3 rounded-full transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
