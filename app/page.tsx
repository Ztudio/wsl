import { BackedBySection } from "./components/landing/BackedBySection";
import { ContactSection } from "./components/landing/ContactSection";
import { CorridorSection } from "./components/landing/CorridorSection";
import { Footer } from "./components/landing/Footer";
import { HeroSection } from "./components/landing/HeroSection";
import { HowItWorksSection } from "./components/landing/HowItWorksSection";
import { InfoSection } from "./components/landing/InfoSection";
import { Navbar } from "./components/landing/Navbar";
import { UseCasesSection } from "./components/landing/UseCasesSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F5]">
      <div className="flex h-screen flex-col overflow-hidden">
        <Navbar />
        <HeroSection />
      </div>

      <InfoSection />
      <BackedBySection />
      <UseCasesSection />
      <HowItWorksSection />
      <CorridorSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
