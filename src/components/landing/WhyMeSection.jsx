import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyMeSection() {
  const { t, isRTL } = useLang();
  const points = t("whyMePoints");

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
          >
            {t("whyMeTitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground leading-relaxed mb-10"
          >
            {t("whyMeParagraph")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-4"
        >
          {points.map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50 hover:border-[#00b4ff]/30 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 mt-0.5 text-[#00b4ff] shrink-0" />
              <span className="text-sm md:text-base text-foreground">{point}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}