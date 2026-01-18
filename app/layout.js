// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import QueryProvider from "@/components/providers/QueryProvider"; // <--- Import this
import { FloatingCart, MobileCartDrawer } from "@/components/shop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HatBari | Fresh Grocery",
  description: "Fresh groceries delivered to your door.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            {" "}
            {children}
            <FloatingCart></FloatingCart>
            <MobileCartDrawer></MobileCartDrawer>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
