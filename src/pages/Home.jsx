import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/LanguageContext";
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

const SECTION_IDS = ["home", "work", "services", "packages", "process", "faq", "contact"];

export default function Home() {
  const { dir } = useLang();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const OFFSET = 100;
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${OFFSET}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div dir={dir} className="min-h-screen bg-background">
      <Header activeSection={activeSection} />
      <main>
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