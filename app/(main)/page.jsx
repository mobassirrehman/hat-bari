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
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Deals />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </>
  );
}
