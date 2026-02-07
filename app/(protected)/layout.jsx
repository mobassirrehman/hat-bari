import { Navbar, Footer } from "@/components/layout";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}