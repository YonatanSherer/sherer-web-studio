import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "he", label: "עברית", flag: "🇮🇱" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
];

export default function Header() {
  const { lang, setLang, nav, isRTL } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      dir={isRTL ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="text-lg md:text-xl font-bold tracking-tight"
          >
            <span className={scrolled ? "text-foreground" : "text-white"}>
              {SITE_CONFIG.brandName}
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link[lang]}
              </button>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${
                    scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  {LANGUAGES.find((l) => l.code === lang)?.flag}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={lang === l.code ? "bg-accent" : ""}
                  >
                    <span className="mr-2">{l.flag}</span> {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={scrolled ? "" : "text-white hover:bg-white/10"}
                >
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={lang === l.code ? "bg-accent" : ""}
                  >
                    <span className="mr-2">{l.flag}</span> {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className={scrolled ? "" : "text-white hover:bg-white/10"}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
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
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  {link[lang]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}