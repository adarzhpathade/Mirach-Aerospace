import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { ProductsSection } from "@/components/sections/ProductsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#252324] text-[#EDE8E4]">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Values Section (Single Card Style Preview) */}
      <ValuesSection />

      {/* Applications Section — Domain Dossier with CAD Viewport */}
      <ApplicationsSection />

      {/* Products Section — Editorial CAD Showcase */}
      <ProductsSection />
    </main>
  );
}
