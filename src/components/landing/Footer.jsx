import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/siteConfig";
import { Github, Linkedin, Facebook, Instagram, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const { t, isRTL, lang } = useLang();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const socials = [
    { icon: Linkedin, href: SITE_CONFIG.linkedin, label: "LinkedIn" },
    { icon: Github, href: SITE_CONFIG.github, label: "GitHub" },
    { icon: Facebook, href: SITE_CONFIG.facebook, label: "Facebook" },
    { icon: Instagram, href: SITE_CONFIG.instagram, label: "Instagram" },
  ];

  return (
    <footer dir={isRTL ? "rtl" : "ltr"} className="bg-[#0a0e1a] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">{SITE_CONFIG.brandName}</h3>
            <p className="text-sm leading-relaxed mb-4">{t("footerTagline")}</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {lang === "he" ? "ניווט" : lang === "th" ? "เมนู" : "Navigation"}
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link[lang]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {lang === "he" ? "צור קשר" : lang === "th" ? "ติดต่อ" : "Contact"}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#00b4ff]" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.line}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#00B900]" />
                  LINE
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/40">
          {t("footerCopyright")}
        </div>
      </div>
    </footer>
  );
}