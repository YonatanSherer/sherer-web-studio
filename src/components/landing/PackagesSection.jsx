import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function PackagesSection() {
  const { t, isRTL, lang } = useLang();
  const packages = t("packages");
  const popularLabel = lang === "he" ? "הכי פופולרי" : lang === "th" ? "ยอดนิยม" : "Most Popular";
  const startingFrom = lang === "he" ? "החל מ-" : lang === "th" ? "เริ่มต้นที่ " : "Starting from ";

  return (
    <section id="packages" dir={isRTL ? "rtl" : "ltr"} className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("packagesTitle")}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t("packagesSubtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`h-full relative overflow-hidden transition-all duration-300 ${
                  pkg.popular
                    ? "border-[#00b4ff] shadow-xl shadow-[#00b4ff]/10 scale-[1.02]"
                    : "border-border/50 hover:shadow-lg hover:border-[#00b4ff]/30"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00b4ff] to-[#00e5ff]" />
                )}
                <CardHeader className="pb-4">
                  {pkg.popular && (
                    <Badge className="w-fit bg-[#00b4ff]/10 text-[#00b4ff] border-[#00b4ff]/20 mb-2">
                      <Star className="w-3 h-3 me-1" />
                      {popularLabel}
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.bestFor}</p>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">{startingFrom}</span>
                    <span className="text-3xl font-extrabold text-foreground">{pkg.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 mt-0.5 text-[#00b4ff] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full h-11 font-semibold rounded-xl ${
                      pkg.popular
                        ? "bg-[#00b4ff] hover:bg-[#0090cc] text-white shadow-md shadow-[#00b4ff]/20"
                        : "bg-foreground/5 hover:bg-foreground/10 text-foreground"
                    }`}
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      base44.analytics.track({
                        eventName: "package_cta_click",
                        properties: { package: pkg.name },
                      });
                    }}
                  >
                    {pkg.cta}
                    <ArrowRight className="w-4 h-4 ms-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto"
        >
          {t("packagesNote")}
        </motion.p>
      </div>
    </section>
  );
}