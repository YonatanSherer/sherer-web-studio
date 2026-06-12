import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FaqSection() {
  const { t, isRTL } = useLang();
  const faqItems = t("faqItems");

  return (
    <section
      id="faq"
      dir={isRTL ? "rtl" : "ltr"}
      className="py-14 md:py-20"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-8 ${isRTL ? "text-right" : "text-center"}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("faqTitle")}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/50 rounded-xl px-5 data-[state=open]:border-[#00b4ff]/30 data-[state=open]:bg-[#00b4ff]/3 transition-colors"
              >
                <AccordionTrigger
                  className={`text-sm font-medium text-foreground hover:text-[#00b4ff] hover:no-underline py-4 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className={`text-sm text-muted-foreground leading-relaxed pb-4 ${isRTL ? "text-right" : ""}`}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}