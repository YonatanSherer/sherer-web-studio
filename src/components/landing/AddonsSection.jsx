import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function AddonsSection() {
  const { t, isRTL } = useLang();
  const addons = t("addons");

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("addonsTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("addonsSubtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {addons.map((addon, i) => (
            <Badge
              key={i}
              variant="outline"
              className="px-4 py-2 text-sm font-medium text-muted-foreground border-border/70 hover:border-[#00b4ff]/40 hover:text-foreground transition-colors cursor-default"
            >
              <Plus className="w-3 h-3 me-1.5 text-[#00b4ff]" />
              {addon}
            </Badge>
          ))}
        </motion.div>
      </div>
    </section>
  );
}