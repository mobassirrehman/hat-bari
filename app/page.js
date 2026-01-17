// Home Page - Landing Page
// URL: http://localhost:3000/

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
        {/* Section 1: Hero Banner */}
        <Hero />

        {/* Section 2: Categories */}
        <Categories />

        {/* Section 3: Featured Products */}
        <FeaturedProducts />

        {/* Section 4: Daily Deals */}
        <Deals />

        {/* Section 5: Why Choose Us */}
        <Features />

        {/* Section 6: How It Works */}
        <HowItWorks />

        {/* Section 7: Testimonials */}
        <Testimonials />

        {/* Section 8: Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
