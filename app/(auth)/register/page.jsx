"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [userRole, setUserRole] = useState("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: userRole }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created! Please login.");
        router.push("/login");
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white py-20">
      <div className="w-full max-w-[500px] px-6">
        <div className="flex items-center gap-8 mb-8">
          <Link
            href="/login"
            className="text-3xl font-bold text-gray-300 hover:text-gray-500 transition-colors pb-1"
          >
            Login
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 border-b-2 border-teal-600 pb-1 cursor-default">
            Register
          </h1>
        </div>

        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Create an account to track your orders, manage your addresses, and
          more.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 transition-all text-gray-800"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 transition-all text-gray-800"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 transition-all text-gray-800"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                checked={userRole === "customer"}
                onChange={() => setUserRole("customer")}
                className="w-4 h-4 text-teal-600 focus:ring-teal-600 border-gray-300"
              />
              <span className="text-sm font-bold text-gray-700">
                I am a customer
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                checked={userRole === "vendor"}
                onChange={() => setUserRole("vendor")}
                className="w-4 h-4 text-teal-600 focus:ring-teal-600 border-gray-300"
              />
              <span className="text-sm font-bold text-gray-700">
                I am a vendor
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-teal-700/20 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isLoading}
          className="w-full py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-bold transition-all flex items-center justify-center gap-3"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          Google
        </button>
      </div>
    </div>
  );
}
