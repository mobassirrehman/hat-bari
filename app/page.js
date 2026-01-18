import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  Categories,
  FeaturedProducts,
  Deals,
  Features,
  HowItWorks,
  Testimonials,
  Newsletter,
} from "@/components/landing";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Categories />

        <FeaturedProducts />

        <Deals />

        <Features />

        <HowItWorks />

        <Testimonials />

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
