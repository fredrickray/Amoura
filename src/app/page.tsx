import { AboutQuote } from "@/components/home/AboutQuote";
import { BlogSection } from "@/components/home/BlogSection";
import { CTABanner } from "@/components/home/CTABanner";
import { FAQSection } from "@/components/home/FAQSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { MethodsSection } from "@/components/home/MethodsSection";
import { Stats } from "@/components/home/Stats";
import { TrustBar } from "@/components/home/TrustBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutQuote />
      <FeaturedProducts />
      <Stats />
      <MethodsSection />
      <BlogSection />
      <FAQSection />
      <CTABanner />
    </>
  );
}
