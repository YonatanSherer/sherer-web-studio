import React, { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { PORTFOLIO_PROJECTS } from "@/lib/siteConfig";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, Check } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const CATEGORY_MAP = {
  all: "filterAll",
  business: "filterBusiness",
  multilingual: "filterMultilingual",
  webApp: "filterWebApps",
};

export default function FeaturedWork() {
  const { t, isRTL } = useLang();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="work"
      dir={isRTL ? "rtl" : "ltr"}
      className="py-14 md:py-20"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-8 ${isRTL ? "text-right" : "text-center"}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("workTitle")}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t("workSubtitle")}
          </p>
        </motion.div>

        {/* Filters */}
        <div className={`flex flex-wrap gap-2 mb-8 ${isRTL ? "justify-end" : "justify-center"}`}>
          {Object.entries(CATEGORY_MAP).map(([key, labelKey]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                activeFilter === key
                  ? "bg-[#00b4ff] text-white border-[#00b4ff] shadow-sm shadow-[#00b4ff]/20"
                  : "border-border/50 text-muted-foreground hover:border-[#00b4ff]/40 hover:text-foreground"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} t={t} isRTL={isRTL} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, t, isRTL }) {
  const [showDeliverables, setShowDeliverables] = useState(false);

  const handleCTA = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener noreferrer");
      base44.analytics.track({ eventName: "portfolio_cta_click", properties: { project: project.id } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/10 hover:border-[#00b4ff]/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        <img
          src={project.image}
          alt={t(project.nameKey)}
          loading="lazy"
          className="w-full h-full object-cover opacity-75 group-hover:opacity-85 group-hover:scale-[1.02] transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Status + Category badges */}
        <div className={`absolute top-3 ${isRTL ? "right-3 flex-row-reverse" : "left-3"} flex gap-2`}>
          <Badge
            className={`text-xs font-medium px-2.5 py-0.5 ${
              project.status === "live"
                ? "bg-emerald-500/90 text-white border-0 shadow-sm"
                : "bg-[#00b4ff]/90 text-white border-0 shadow-sm"
            }`}
          >
            {t(project.statusKey)}
          </Badge>
          <Badge className="text-xs bg-black/50 text-white border-0 backdrop-blur-sm">
            {t(project.categoryKey)}
          </Badge>
        </div>
        {/* Languages */}
        <div className={`absolute bottom-3 ${isRTL ? "left-3" : "right-3"} flex items-center gap-1.5`}>
          <Globe className="w-3 h-3 text-white/60" />
          <span className="text-xs text-white/70">{project.langLabels.join(" · ")}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-foreground mb-1.5">{t(project.nameKey)}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t(project.descKey)}</p>

        {/* Deliverables toggle */}
        <button
          onClick={() => setShowDeliverables(!showDeliverables)}
          className="text-xs font-medium text-[#00b4ff] hover:text-[#0090cc] transition-colors mb-3 flex items-center gap-1"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          {showDeliverables ? "▲" : "▼"} {t("deliverablesLabel")}
        </button>

        {showDeliverables && (
          <ul className="mb-4 space-y-1.5">
            {project.deliverables.map((d, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground" style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
                <Check className="w-3 h-3 text-[#00b4ff] flex-shrink-0" />
                {t(d)}
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        {project.liveUrl ? (
          <button
            onClick={handleCTA}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00b4ff] hover:bg-[#0099dd] text-white text-xs font-semibold transition-colors"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            {t(project.buttonKey)}
            <ExternalLink className="w-3 h-3" />
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground text-xs font-medium border border-border/40">
            {t("btnPreviewSoon")}
          </span>
        )}
      </div>
    </motion.div>
  );
}