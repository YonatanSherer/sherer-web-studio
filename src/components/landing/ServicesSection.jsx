import React, { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Layout, Globe, Languages, AppWindow, RefreshCw, Wrench, ArrowRight, ChevronDown, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const ICON_MAP = { Layout, Globe, Languages, AppWindow, RefreshCw, Wrench };

export default function ServicesSection() {
  const { t, isRTL } = useLang();
  const services = t("services");
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <section
      id="services"
      dir={isRTL ? "rtl" : "ltr"}
      className="py-14 md:py-20 bg-muted/20"
      style={{ scrollMarginTop: "72px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-10 ${isRTL ? "text-right" : "text-center"}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("servicesTitle")}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">{t("servicesSubtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Layout;
            const isExpanded = expandedIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className={`h-full border-border/50 transition-all duration-300 ${isExpanded ? "shadow-lg border-[#00b4ff]/30" : "hover:shadow-md hover:border-[#00b4ff]/20"}`}>
                  <CardContent className="p-5">
                    <div
                      className="flex items-start gap-3 mb-3"
                      style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#00b4ff]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4.5 h-4.5 text-[#00b4ff]" style={{ width: "18px", height: "18px" }} />
                      </div>
                      <div className={`flex-1 min-w-0 ${isRTL ? "text-right" : ""}`}>
                        <h3 className="text-sm font-semibold text-foreground leading-snug">{service.title}</h3>
                      </div>
                    </div>
                    <p className={`text-xs text-muted-foreground leading-relaxed mb-4 ${isRTL ? "text-right" : ""}`}>
                      {service.summary}
                    </p>

                    <div
                      className="flex items-center gap-3 flex-wrap"
                      style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                    >
                      <button
                        onClick={() => setExpandedIdx(isExpanded ? null : i)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#00b4ff] hover:text-[#0090cc] transition-colors"
                        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                      >
                        {t("servicesDeliverablesBtn")}
                        <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      <a
                        href={SITE_CONFIG.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => base44.analytics.track({ eventName: "service_cta_click", properties: { service: service.title } })}
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                      >
                        {t("servicesCta")}
                        <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
                      </a>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 pt-4 border-t border-border/40 space-y-2">
                            {service.deliverables.map((d, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground" style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
                                <Check className="w-3 h-3 mt-0.5 text-[#00b4ff] flex-shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}