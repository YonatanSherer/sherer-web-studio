import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const STEP_ICONS = [Search, PenTool, Code2, Rocket];

export default function ProcessSection() {
  const { t, isRTL } = useLang();
  const steps = t("processSteps");

  return (
    <section id="process" dir={isRTL ? "rtl" : "ltr"} className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("processTitle")}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t("processSubtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative text-center"
              >
                {/* Connector line for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 w-full h-px bg-border/60" style={isRTL ? { left: "-50%" } : { left: "50%" }} />
                )}
                <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl bg-[#00b4ff]/10 flex items-center justify-center mb-4">
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00b4ff] text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <Icon className="w-6 h-6 text-[#00b4ff]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}