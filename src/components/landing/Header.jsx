import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/siteConfig";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "he", label: "Hebrew", native: "עברית" },
  { code: "th", label: "Thai", native: "ไทย" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "ru", label: "Russian", native: "Русский" },
];

export default function Header({ activeSection }) {
  const { lang, setLang, isRTL } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e1a]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between h-16 md:h-[68px]"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="text-base md:text-lg font-bold tracking-tight text-white hover:text-[#00b4ff] transition-colors flex-shrink-0"
          >
            {SITE_CONFIG.brandName}
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-[#00b4ff]"
                      : "text-white/70 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {link[lang] || link.en}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#00b4ff] rounded-full"
                    />
                  )}
                </button>
              );
            })}

            {/* Language Selector */}
            <div ref={langRef} className="relative ms-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#00b4ff]" />
                <span>{currentLang?.native}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-1 right-0 w-44 bg-[#0d1529] border border-white/12 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          lang === l.code
                            ? "bg-[#00b4ff]/15 text-[#00b4ff] font-medium"
                            : "text-white/70 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        {l.native}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile: lang + hamburger */}
          <div className="flex lg:hidden items-center gap-1" style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 p-2 text-white/70 hover:text-white transition-colors rounded-lg"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">{currentLang?.code.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full mt-1 right-0 w-40 bg-[#0d1529] border border-white/12 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          lang === l.code ? "bg-[#00b4ff]/15 text-[#00b4ff]" : "text-white/70 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        {l.native}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-white/70 hover:text-white transition-colors rounded-lg"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0e1a]/98 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-3 space-y-0.5" dir={isRTL ? "rtl" : "ltr"}>
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors text-start ${
                      isActive
                        ? "bg-[#00b4ff]/10 text-[#00b4ff]"
                        : "text-white/70 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    {link[lang] || link.en}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}