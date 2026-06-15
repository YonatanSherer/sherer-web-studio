import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Languages, DollarSign, Target, Code, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { CONTACT_LINKS } from "@/lib/siteConfig";
import { scrollToSection } from "@/lib/scrollUtils";

const TRUST_ICONS = [Smartphone, Languages, DollarSign, Target, Code];

// WhatsApp SVG icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// LINE SVG icon
const LINEIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

export default function HeroSection() {
  const { t, isRTL } = useLang();
  const trustPoints = t("heroTrust");

  const scrollTo = scrollToSection;

  return (
    <section
      id="home"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-[92vh] flex items-center overflow-hidden w-full"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060a14] via-[#0a1022] to-[#081428]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_20%,rgba(0,180,255,0.10),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_0%_100%,rgba(0,100,200,0.07),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      {/* Glow orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00b4ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b4ff]/10 border border-[#00b4ff]/20 text-[#00b4ff] text-xs font-medium mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00b4ff] animate-pulse" />
                {t("heroBadge")}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
                {t("heroHeadline")}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 text-base md:text-lg text-white/65 leading-relaxed"
            >
              {t("heroSubheadline")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-7 flex flex-wrap gap-3"
              style={{ flexDirection: isRTL ? "row-reverse" : "row", justifyContent: isRTL ? "flex-end" : "flex-start" }}
            >
              <Button
                size="lg"
                className="bg-[#00b4ff] hover:bg-[#0099dd] text-white font-semibold px-6 h-12 text-[15px] rounded-xl shadow-lg shadow-[#00b4ff]/20 transition-all duration-200"
                onClick={() => {
                  scrollTo("contact");
                  base44.analytics.track({ eventName: "hero_cta_free_quote_click" });
                }}
              >
                {t("heroCta1")}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "me-2 rotate-180" : "ms-2"}`} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#facc15]/70 text-white bg-transparent hover:bg-[#facc15]/10 hover:border-[#facc15] hover:text-white focus-visible:border-[#facc15] focus-visible:text-white font-semibold px-6 h-12 text-[15px] rounded-xl transition-all duration-200 shadow-[0_0_14px_rgba(250,204,21,0.25)] hover:shadow-[0_0_22px_rgba(250,204,21,0.40)]"
                onClick={() => scrollTo("work")}
              >
                {t("heroCta2")}
              </Button>
            </motion.div>

            {/* Direct contact */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-5 flex flex-wrap gap-2"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => base44.analytics.track({ eventName: "whatsapp_click", properties: { location: "hero" } })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/12 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/22 transition-colors border border-[#25D366]/20"
                aria-label={t("floatWhatsApp")}
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a
                href={CONTACT_LINKS.line}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => base44.analytics.track({ eventName: "line_click", properties: { location: "hero" } })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06C755]/12 text-[#06C755] text-xs font-medium hover:bg-[#06C755]/22 transition-colors border border-[#06C755]/20"
                aria-label={t("floatLINE")}
              >
                <LINEIcon />
                LINE
              </a>
              <a
                href={CONTACT_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => base44.analytics.track({ eventName: "linkedin_click", properties: { location: "hero" } })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2]/12 text-[#0A66C2] text-xs font-medium hover:bg-[#0A66C2]/22 transition-colors border border-[#0A66C2]/20"
                aria-label={t("floatLinkedIn")}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <a
                href={CONTACT_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => base44.analytics.track({ eventName: "github_click", properties: { location: "hero" } })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/8 text-white/70 text-xs font-medium hover:bg-white/14 hover:text-white transition-colors border border-white/15"
                aria-label={t("floatGitHub")}
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href={CONTACT_LINKS.email}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EA4335]/12 text-[#EA4335] text-xs font-medium hover:bg-[#EA4335]/22 transition-colors border border-[#EA4335]/20"
                aria-label={t("floatEmail")}
              >
                <GmailIcon />
                Gmail
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 pt-7 border-t border-white/8 flex flex-wrap gap-x-5 gap-y-2.5"
              style={{ justifyContent: isRTL ? "flex-end" : "flex-start" }}
            >
              {trustPoints.map((point, i) => {
                const Icon = TRUST_ICONS[i] || Code;
                return (
                  <div key={i} className="flex items-center gap-2 text-white/45 text-xs" style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
                    <Icon className="w-3.5 h-3.5 text-[#00b4ff]/60 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right: browser mockup */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
              {/* Browser chrome */}
              <div className="bg-[#1a2236] px-4 py-3 flex items-center gap-2 border-b border-white/8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c940]" />
                </div>
                <div className="flex-1 bg-[#0a1022] rounded-md h-6 flex items-center px-3">
                  <span className="text-white/30 text-xs font-mono">shererwebstudio.com</span>
                </div>
              </div>
              {/* Preview image */}
              <div className="relative h-72 bg-gradient-to-br from-[#0a1528] to-[#0d1f3a] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80"
                  alt="Website portfolio preview"
                  className="w-full h-full object-cover opacity-60"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1528]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00b4ff]/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5 rounded bg-[#00b4ff]/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="h-3 bg-white/40 rounded w-32 mb-1.5" />
                        <div className="h-2 bg-white/20 rounded w-48" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-[#00b4ff]/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}