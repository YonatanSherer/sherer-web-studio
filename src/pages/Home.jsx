import React from "react";
import { useLang } from "@/lib/LanguageContext";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import TrustStrip from "@/components/landing/TrustStrip";
import ServicesSection from "@/components/landing/ServicesSection";
import PackagesSection from "@/components/landing/PackagesSection";
import AddonsSection from "@/components/landing/AddonsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import WhyMeSection from "@/components/landing/WhyMeSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import ContactSection from "@/components/landing/ContactSection";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import FloatingButtons from "@/components/landing/FloatingButtons";

export default function Home() {
  const { dir } = useLang();

  return (
    <div dir={dir} className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustStrip />
        <ServicesSection />
        <PackagesSection />
        <AddonsSection />
        <ProcessSection />
        <PortfolioSection />
        <WhyMeSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}