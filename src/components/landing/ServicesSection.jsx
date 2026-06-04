import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Layout, Globe, Languages, AppWindow, RefreshCw, Wrench, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const ICON_MAP = { Layout, Globe, Languages, AppWindow, RefreshCw, Wrench };

export default function ServicesSection() {
  const { t, isRTL } = useLang();
  const services = t("services");

  return (
    <section id="services" dir={isRTL ? "rtl" : "ltr"} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("servicesTitle")}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t("servicesSubtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Layout;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full group hover:shadow-xl hover:shadow-[#00b4ff]/5 transition-all duration-300 border-border/50 hover:border-[#00b4ff]/30">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#00b4ff]/10 flex items-center justify-center mb-4 group-hover:bg-[#00b4ff]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#00b4ff]" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                    <a
                      href={SITE_CONFIG.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        base44.analytics.track({
                          eventName: "service_cta_click",
                          properties: { service: service.title },
                        })
                      }
                      className="inline-flex items-center text-sm font-medium text-[#00b4ff] hover:text-[#0090cc] transition-colors"
                    >
                      {t("servicesCta")}
                      <ArrowRight className="w-3.5 h-3.5 ms-1" />
                    </a>
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