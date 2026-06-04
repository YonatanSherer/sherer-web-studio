import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Monitor, Globe, AppWindow, User } from "lucide-react";
import { motion } from "framer-motion";

const PORTFOLIO_ICONS = [Monitor, Globe, AppWindow, User];

export default function PortfolioSection() {
  const { t, isRTL } = useLang();
  const items = t("portfolioItems");

  return (
    <section id="portfolio" dir={isRTL ? "rtl" : "ltr"} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("portfolioTitle")}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t("portfolioSubtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = PORTFOLIO_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50">
                  {/* Placeholder visual */}
                  <div className="h-44 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                    <div className="w-16 h-16 rounded-2xl bg-[#00b4ff]/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#00b4ff]/60" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="absolute top-4 start-4 text-xs bg-background/80 backdrop-blur-sm"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg text-muted-foreground"
                      disabled
                    >
                      <ExternalLink className="w-3.5 h-3.5 me-1.5" />
                      {item.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}