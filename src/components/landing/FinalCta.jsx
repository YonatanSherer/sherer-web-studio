import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function FinalCta() {
  const { t, isRTL } = useLang();

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="relative py-20 md:py-28 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0d1529] to-[#0a1628]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.1),transparent_60%)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          {t("finalCtaHeadline")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button
            size="lg"
            className="bg-[#00b4ff] hover:bg-[#0090cc] text-white font-semibold px-6 h-12 rounded-xl shadow-lg shadow-[#00b4ff]/20"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              base44.analytics.track({ eventName: "final_cta_free_quote" });
            }}
          >
            {t("finalCta1")}
            <ArrowRight className="w-4 h-4 ms-2" />
          </Button>
          <Button
            size="lg"
            asChild
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 h-12 rounded-xl"
          >
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "whatsapp_click", properties: { location: "final_cta" } })}
            >
              <MessageCircle className="w-4 h-4 me-2" />
              {t("finalCta2")}
            </a>
          </Button>
          <Button
            size="lg"
            asChild
            className="bg-[#00B900] hover:bg-[#009a00] text-white font-semibold px-6 h-12 rounded-xl"
          >
            <a
              href={SITE_CONFIG.line}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "line_click", properties: { location: "final_cta" } })}
            >
              <MessageCircle className="w-4 h-4 me-2" />
              {t("finalCta3")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}