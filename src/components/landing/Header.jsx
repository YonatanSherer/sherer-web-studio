import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/siteConfig";
import { scrollToSection } from "@/lib/scrollUtils";
import { useBrandSettings } from "@/lib/useBrandSettings";
import { motion, AnimatePresence } from "framer-motion";

const RADIUS_CLASS = {
  none: "rounded-none",
  rounded: "rounded-lg",
  full: "rounded-full",
};

const BG_CLASS = {
  transparent: "",
  dark: "bg-[#0a0e1a]",
  glow: "bg-[#00b4ff]/10 shadow-[0_0_12px_rgba(0,180,255,0.3)]",
};

const LANGUAGES = [
  { code: "en", native: "English" },
  { code: "he", native: "עברית" },
  { code: "th", native: "ไทย" },
  { code: "ar", native: "العربية" },
  { code: "es", native: "Español" },
  { code: "fr", native: "Français" },
  { code: "de", native: "Deutsch" },
  { code: "ru", native: "Русский" },
];

export default function Header({ activeSection }) {
  const { lang, setLang, isRTL } = useLang();
  const { logoUrl, altText, config } = useBrandSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langDesktopRef = useRef(null);
  const langMobileRef = useRef(null);
  const menuRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      const clickedInsideDesktop = langDesktopRef.current?.contains(e.target);
      const clickedInsideMobile = langMobileRef.current?.contains(e.target);
      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Prevent background scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Escape key closes menu/lang dropdown
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleNavClick = useCallback((sectionId) => {
    setMenuOpen(false);
    setLangOpen(false);
    scrollToSection(sectionId);
  }, []);

  const handleLangSelect = useCallback((code) => {
    setLang(code);
    setLangOpen(false);
  }, [setLang]);

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  const LangDropdown = ({ isMobile }) => (
    <AnimatePresence>
      {langOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className={`absolute ${isMobile ? "right-0" : isRTL ? "left-0" : "right-0"} top-full mt-1 w-44 bg-[#0d1529] border border-white/12 rounded-xl shadow-2xl overflow-hidden z-[100]`}
          role="listbox"
          aria-label="Select language"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={lang === l.code}
              onClick={() => handleLangSelect(l.code)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
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
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0e1a]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/8"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center h-[72px]"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-white hover:text-[#00b4ff] transition-colors flex-shrink-0"
              aria-label="Go to home"
            >
              {logoUrl && (
                <>
                  <img
                    src={logoUrl}
                    alt={altText}
                    style={{ width: config.mobileSize, height: config.mobileSize }}
                    className={`object-contain lg:hidden ${RADIUS_CLASS[config.borderRadius] || ""} ${BG_CLASS[config.background] || ""}`}
                  />
                  <img
                    src={logoUrl}
                    alt={altText}
                    style={{ width: config.desktopSize, height: config.desktopSize }}
                    className={`object-contain hidden lg:block ${RADIUS_CLASS[config.borderRadius] || ""} ${BG_CLASS[config.background] || ""}`}
                  />
                </>
              )}
              <span>{SITE_CONFIG.brandName}</span>
            </button>

            <div className="flex-1" />

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    aria-current={isActive ? "page" : undefined}
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

              {/* Desktop Language Selector */}
              <div ref={langDesktopRef} className="relative ms-2">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  aria-label={`Language: ${currentLang.native}`}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-[#00b4ff]" />
                  <span>{currentLang.native}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>
                <LangDropdown isMobile={false} />
              </div>
            </nav>

            {/* Mobile: lang + hamburger */}
            <div
              className="flex lg:hidden items-center gap-1"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <div ref={langMobileRef} className="relative">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  aria-label={`Language: ${currentLang.native}`}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  className="flex items-center gap-1 p-2 text-white/70 hover:text-white transition-colors rounded-lg"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-medium">{currentLang.code.toUpperCase()}</span>
                </button>
                <LangDropdown isMobile={true} />
              </div>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 text-white/70 hover:text-white transition-colors rounded-lg"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Menu panel */}
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22 }}
              className="fixed top-[72px] left-0 right-0 z-50 lg:hidden bg-[#0a0e1a]/98 backdrop-blur-xl border-b border-white/10"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="px-4 py-3 space-y-0.5" dir={isRTL ? "rtl" : "ltr"}>
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex w-full px-4 py-3.5 text-sm font-medium rounded-xl transition-colors text-start ${
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
          </>
        )}
      </AnimatePresence>
    </>
  );
}