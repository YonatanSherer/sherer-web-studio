import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const { t, isRTL } = useLang();
  const testimonials = t("testimonials");

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("testimonialsTitle")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-border/50 border-dashed">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Quote className="w-8 h-8 text-[#00b4ff]/20 mb-4" />
                  <p className="text-muted-foreground italic mb-4">{item.text}</p>
                  <p className="text-sm font-medium text-muted-foreground/70">{item.author}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}