import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { Smartphone, Target, Languages, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";

const ICONS = [Smartphone, Target, Languages, CheckSquare];

export default function TrustStrip() {
  const { t, isRTL } = useLang();

  const items = [
    { title: t("trustTitle1"), desc: t("trustDesc1") },
    { title: t("trustTitle2"), desc: t("trustDesc2") },
    { title: t("trustTitle3"), desc: t("trustDesc3") },
    { title: t("trustTitle4"), desc: t("trustDesc4") },
  ];

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="py-8 border-y border-border/30 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3"
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <div className="w-9 h-9 rounded-lg bg-[#00b4ff]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-[#00b4ff]" />
                </div>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}