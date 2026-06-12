import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/LanguageContext";
import { NAV_HEIGHT } from "@/lib/scrollUtils";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import TrustStrip from "@/components/landing/TrustStrip";
import FeaturedWork from "@/components/landing/FeaturedWork";
import ServicesSection from "@/components/landing/ServicesSection";
import PackagesSection from "@/components/landing/PackagesSection";
import ProcessSection from "@/components/landing/ProcessSection";
import WhyMeSection from "@/components/landing/WhyMeSection";
import ExpectSection from "@/components/landing/ExpectSection";
import FaqSection from "@/components/landing/FaqSection";
import ContactSection from "@/components/landing/ContactSection";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import FloatingButtons from "@/components/landing/FloatingButtons";

// Must match section IDs rendered in each component
const SECTION_IDS = ["home", "work", "services", "packages", "process", "faq", "contact"];

export default function Home() {
  const { dir } = useLang();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;

      // Near the top → always "home"
      if (scrollY < 80) {
        setActiveSection("home");
        return;
      }

      // Walk sections from bottom to top to find the first one whose top
      // has crossed the sticky-nav threshold (NAV_HEIGHT + small buffer)
      const threshold = NAV_HEIGHT + 40;
      let found = null;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY >= top - threshold) {
          found = SECTION_IDS[i];
          break;
        }
      }
      if (found) setActiveSection(found);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div dir={dir} className="min-h-screen bg-background">
      <Header activeSection={activeSection} />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <FeaturedWork />
        <ServicesSection />
        <PackagesSection />
        <ProcessSection />
        <WhyMeSection />
        <ExpectSection />
        <FaqSection />
        <ContactSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}