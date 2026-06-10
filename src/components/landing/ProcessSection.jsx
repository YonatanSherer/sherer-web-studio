import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const STEP_ICONS = [Search, PenTool, Code, Rocket];

export default function ProcessSection() {
  const { t, isRTL } = useLang();
  const steps = t("processSteps");

  return (
    <section
      id="process"
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
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("processTitle")}</h2>
          <p className="mt-3 text-muted-foreground text-sm md:text-base">{t("processSubtitle")}</p>
        </motion.div>

        {/* Desktop: connected horizontal timeline */}
        <div className="hidden md:grid md:grid-cols-4 gap-0 mb-10 relative">
          {/* Connector line */}
          <div
            className="absolute top-8 h-0.5 bg-gradient-to-r from-[#00b4ff]/20 via-[#00b4ff]/50 to-[#00b4ff]/20"
            style={{
              left: "12.5%",
              right: "12.5%",
              ...(isRTL ? { transform: "scaleX(-1)" } : {}),
            }}
          />
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center px-4 relative"
              >
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-card border border-[#00b4ff]/20 shadow-lg flex items-center justify-center mb-4 group-hover:border-[#00b4ff]/50 transition-colors">
                  <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-[#00b4ff] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                  <Icon className="w-6 h-6 text-[#00b4ff]" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-4 mb-10">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 items-start"
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-card border border-[#00b4ff]/20 shadow flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00b4ff]" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#00b4ff] text-white text-[9px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div className={`flex-1 pt-1 ${isRTL ? "text-right" : ""}`}>
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              base44.analytics.track({ eventName: "process_cta_click" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00b4ff] hover:bg-[#0099dd] text-white text-sm font-semibold shadow-md shadow-[#00b4ff]/20 transition-colors"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            {t("processCta")}
            <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}