import React, { createContext, useContext, useState, useCallback } from "react";
import { CONTENT, NAV_LINKS } from "./siteConfig";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const t = useCallback((key) => {
    return CONTENT[lang]?.[key] || CONTENT.en[key] || key;
  }, [lang]);

  const nav = useCallback((id) => {
    const link = NAV_LINKS.find((l) => l.id === id);
    return link ? link[lang] || link.en : id;
  }, [lang]);

  const isRTL = lang === "he";
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