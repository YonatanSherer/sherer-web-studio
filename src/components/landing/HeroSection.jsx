import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Smartphone, Zap, Languages, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const TRUST_ICONS = [Smartphone, Zap, Languages, Sparkles];

export default function HeroSection() {
  const { t, isRTL } = useLang();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0d1529] to-[#0a1628]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,180,255,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,220,255,0.08),transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
          >
            {t("heroHeadline")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl"
          >
            {t("heroSubheadline")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              className="bg-[#00b4ff] hover:bg-[#0090cc] text-white font-semibold px-6 h-12 text-base rounded-xl shadow-lg shadow-[#00b4ff]/20"
              onClick={() => {
                scrollTo("contact");
                base44.analytics.track({ eventName: "hero_cta_free_quote_click" });
              }}
            >
              {t("heroCta1")}
              <ArrowRight className="w-4 h-4 ms-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-semibold px-6 h-12 text-base rounded-xl"
              onClick={() => scrollTo("packages")}
            >
              {t("heroCta2")}
            </Button>
          </motion.div>

          {/* Quick contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "whatsapp_click", properties: { location: "hero" } })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/15 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/25 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={SITE_CONFIG.line}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "line_click", properties: { location: "hero" } })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00B900]/15 text-[#00B900] text-sm font-medium hover:bg-[#00B900]/25 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              LINE
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            {t("heroTrust").map((point, i) => {
              const Icon = TRUST_ICONS[i];
              return (
                <div key={i} className="flex items-center gap-2 text-white/50 text-sm">
                  <Icon className="w-4 h-4 text-[#00b4ff]/70" />
                  {point}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}