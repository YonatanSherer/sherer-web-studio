import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { Code2, Monitor, Globe, Smartphone, Languages, TrendingUp } from "lucide-react";

const VALUE_ICONS = [Code2, Monitor, Globe, Smartphone, Languages, TrendingUp];

export default function WhyMeSection() {
  const { t, isRTL } = useLang();
  const points = t("whyMePoints");

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isRTL ? "text-right lg:order-2" : ""}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">{t("whyMeTitle")}</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {t("whyMeIntro")}
            </p>
          </motion.div>

          {/* Right: value cards grid */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${isRTL ? "lg:order-1" : ""}`}
          >
            {points.map((point, i) => {
              const Icon = VALUE_ICONS[i] || TrendingUp;
              return (
                <div
                  key={i}
                  className="group p-4 rounded-xl border border-border/50 bg-card hover:border-[#00b4ff]/30 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00b4ff]/10 flex items-center justify-center mb-2.5 group-hover:bg-[#00b4ff]/15 transition-colors">
                    <Icon className="w-4 h-4 text-[#00b4ff]" />
                  </div>
                  <p className={`text-xs font-semibold text-foreground leading-snug mb-1 ${isRTL ? "text-right" : ""}`}>
                    {point.title}
                  </p>
                  <p className={`text-xs text-muted-foreground leading-relaxed ${isRTL ? "text-right" : ""}`}>
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}