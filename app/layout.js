import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "হাটবাড়ি - HatBari | Your Trusted Supershop",
  description:
    "Fresh groceries, daily essentials, and quality products delivered to your doorstep.",
  keywords:
    "grocery, supershop, bangladesh, fresh vegetables, fruits, dairy, hatbari",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
