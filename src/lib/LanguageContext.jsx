import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CONTENT, NAV_LINKS } from "./siteConfig";

const LanguageContext = createContext();

const RTL_LANGS = ["he", "ar"];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem("yws_lang") || "en";
    } catch {
      return "en";
    }
  });

  const setLang = useCallback((code) => {
    setLangState(code);
    try { localStorage.setItem("yws_lang", code); } catch {}
    document.documentElement.lang = code;
    document.documentElement.dir = RTL_LANGS.includes(code) ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  }, [lang]);

  const t = useCallback((key) => {
    return CONTENT[lang]?.[key] ?? CONTENT.en[key] ?? key;
  }, [lang]);

  const nav = useCallback((id) => {
    const link = NAV_LINKS.find((l) => l.id === id);
    return link ? link[lang] || link.en : id;
  }, [lang]);

  const isRTL = RTL_LANGS.includes(lang);
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, nav, isRTL, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}