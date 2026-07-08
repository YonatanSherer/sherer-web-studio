import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/lib/LanguageContext";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { ArrowLeft } from "lucide-react";

export default function About() {
  const { dir } = useLang();

  return (
    <div dir={dir} className="min-h-screen bg-background overflow-x-hidden w-full">
      <Header />
      <main id="main-content" className="pt-24 md:pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-6">
            About {SITE_CONFIG.brandName}
          </h1>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              {SITE_CONFIG.brandName} is a web development studio that builds modern, responsive websites
              and practical web applications for small businesses, entrepreneurs, and organizations. The
              studio specializes in business websites, multilingual experiences, landing pages, and
              custom interactive tools that help businesses look professional, communicate their services
              clearly, and receive more customer inquiries.
            </p>
            <p>
              The studio is built for small business owners who need a strong online presence but may not
              have the time, technical knowledge, or budget for a large agency. Whether you run a local
              spa, a tour company, a consulting practice, or a growing startup, the goal is the same: a
              clean, fast, mobile-first website that turns visitors into customers. Particular emphasis is
              placed on multilingual support, including English, Hebrew, Thai, and Arabic, with full
              right-to-left layout support where needed.
            </p>
            <p>
              {SITE_CONFIG.brandName} is founded and operated by {SITE_CONFIG.ownerName}, a developer with
              a software engineering background. Rather than relying on generic templates, every project is
              built on real engineering principles, ensuring that the websites and applications are not
              only visually appealing but also maintainable, performant, and reliable. From the initial
              discovery conversation through design, development, and launch, the process is transparent
              and communication is direct.
            </p>
            <p>
              The studio offers flexible packages starting from simple landing pages to full multilingual
              business websites and custom web applications. Ongoing maintenance and updates are also
              available, so your website continues to evolve alongside your business. If you are looking
              for a developer who combines technical skill with practical business thinking,
              {" "}{SITE_CONFIG.brandName} is ready to help you build a stronger online presence.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#00b4ff] hover:text-[#0099dd] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}