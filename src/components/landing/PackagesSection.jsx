import React, { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function PackagesSection() {
  const { t, isRTL } = useLang();
  const packages = t("packages");
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [showAddons, setShowAddons] = useState(false);

  const popularBadge = t("popularBadge");
  const startingFrom = t("startingFrom");
  const addonsCommon = t("addonsCommon");
  const addonsExtra = t("addonsExtra");

  return (
    <section
      id="packages"
      dir={isRTL ? "rtl" : "ltr"}
      className="py-14 md:py-20 bg-background"
      style={{ scrollMarginTop: "72px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-10 ${isRTL ? "text-right" : "text-center"}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("packagesTitle")}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">{t("packagesSubtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {packages.map((pkg, i) => {
            const isExpanded = expandedIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`relative overflow-hidden transition-all duration-300 flex flex-col h-full ${
                    pkg.popular
                      ? "border-[#00b4ff]/50 shadow-xl shadow-[#00b4ff]/10 scale-[1.02]"
                      : "border-border/50 hover:shadow-lg hover:border-[#00b4ff]/25"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#00b4ff] to-[#00e5ff]" />
                  )}
                  <CardHeader className="pb-3 pt-5">
                    {pkg.popular && (
                      <Badge className="w-fit bg-[#00b4ff]/10 text-[#00b4ff] border-[#00b4ff]/20 mb-2 text-xs">
                        <Star className="w-3 h-3 me-1" />
                        {popularBadge}
                      </Badge>
                    )}
                    <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{pkg.bestFor}</p>
                    <div className="mt-3">
                      <span className="text-xs text-muted-foreground">{startingFrom}</span>
                      <span className="text-3xl font-extrabold text-foreground">{pkg.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col flex-1">
                    <ul className="space-y-2.5 mb-5 flex-1">
                      {pkg.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-xs text-muted-foreground" style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
                          <Check className="w-3.5 h-3.5 mt-0.5 text-[#00b4ff] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Expandable all features */}
                    <button
                      onClick={() => setExpandedIdx(isExpanded ? null : i)}
                      className="flex items-center gap-1 text-xs font-medium text-[#00b4ff] hover:text-[#0090cc] transition-colors mb-4"
                      style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                    >
                      {isExpanded ? t("packagesHide") : t("packagesViewAll")}
                      <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden space-y-2 mb-4 pt-2 border-t border-border/40"
                        >
                          {pkg.allFeatures.map((f, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground" style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
                              <Check className="w-3 h-3 mt-0.5 text-emerald-500 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                    <Button
                      className={`w-full h-10 font-semibold rounded-xl text-sm ${
                        pkg.popular
                          ? "bg-[#00b4ff] hover:bg-[#0099dd] text-white shadow-md shadow-[#00b4ff]/15"
                          : "bg-foreground/5 hover:bg-foreground/10 text-foreground border border-border/50"
                      }`}
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        base44.analytics.track({ eventName: "package_cta_click", properties: { package: pkg.name } });
                      }}
                    >
                      {pkg.cta}
                      <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "me-2 rotate-180" : "ms-2"}`} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`text-center text-xs text-muted-foreground mt-6 max-w-2xl mx-auto ${isRTL ? "text-right" : ""}`}
        >
          ⚠️ {t("packagesNote")}
        </motion.p>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-5 rounded-2xl border border-border/40 bg-muted/20"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-base font-semibold text-foreground">{t("addonsTitle")}</h3>
            <button
              onClick={() => setShowAddons(!showAddons)}
              className="flex items-center gap-1 text-xs font-medium text-[#00b4ff] hover:text-[#0090cc] transition-colors"
            >
              {showAddons ? t("addonsHide") : t("addonsViewAll")}
              <ChevronDown className={`w-3 h-3 transition-transform ${showAddons ? "rotate-180" : ""}`} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {addonsCommon.map((addon, i) => (
              <span key={i} className="px-3 py-1.5 text-xs font-medium rounded-full border border-border/60 text-muted-foreground bg-background hover:border-[#00b4ff]/30 hover:text-foreground transition-colors cursor-default">
                + {addon}
              </span>
            ))}
          </div>
          <AnimatePresence>
            {showAddons && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mt-2">
                  {addonsExtra.map((addon, i) => (
                    <span key={i} className="px-3 py-1.5 text-xs font-medium rounded-full border border-dashed border-border/50 text-muted-foreground/70 bg-background cursor-default">
                      + {addon}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}