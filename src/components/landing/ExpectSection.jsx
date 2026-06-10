import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Award } from "lucide-react";

const ICONS = [MessageSquare, Lightbulb, Award];

export default function ExpectSection() {
  const { t, isRTL } = useLang();
  const items = t("expectItems");

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="py-12 md:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-8 ${isRTL ? "text-right" : "text-center"}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("expectTitle")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i] || Award;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-md hover:border-[#00b4ff]/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00b4ff]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#00b4ff]" />
                </div>
                <h3 className={`text-base font-semibold text-foreground mb-2 ${isRTL ? "text-right" : ""}`}>
                  {item.title}
                </h3>
                <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? "text-right" : ""}`}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}