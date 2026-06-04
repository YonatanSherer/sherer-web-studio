import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { Monitor, Target, Languages, ListChecks } from "lucide-react";
import { motion } from "framer-motion";

const ICONS = [Monitor, Target, Languages, ListChecks];

export default function TrustStrip() {
  const { t, isRTL } = useLang();
  const points = t("trustPoints");

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="py-12 md:py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {points.map((point, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00b4ff]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#00b4ff]" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm md:text-base">{point.title}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{point.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}