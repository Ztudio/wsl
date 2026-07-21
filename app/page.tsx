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
      <div className="relative isolate flex h-screen flex-col overflow-hidden bg-black text-white">
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
            type="video/mp4"
          />
        </video>

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
