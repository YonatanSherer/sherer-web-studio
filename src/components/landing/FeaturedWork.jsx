import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, Check, Github } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const STATUS_COLORS = {
  "Live Demo": "bg-emerald-500/90 text-white border-0 shadow-sm",
  "Demo Project": "bg-[#00b4ff]/90 text-white border-0 shadow-sm",
  "Coming Soon": "bg-amber-500/90 text-white border-0 shadow-sm",
  "Case Study": "bg-purple-500/90 text-white border-0 shadow-sm",
};

// Map DB category values → filter keys
const CATEGORY_FILTER_MAP = {
  "Business Website": "business",
  "Multilingual Website": "multilingual",
  "Web Application": "webApp",
  "Landing Page": "webApp",
  "AI Tool": "webApp",
  "Learning App": "webApp",
  "Productivity App": "webApp",
  "Portfolio": "business",
};

const FILTER_LABELS = {
  all: "filterAll",
  business: "filterBusiness",
  multilingual: "filterMultilingual",
  webApp: "filterWebApps",
};

export default function FeaturedWork() {
  const { t, isRTL } = useLang();
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.PortfolioProject.filter({ active: true }, "displayOrder", 100)
      .then(data => {
        // Sort: by displayOrder first, featured on top within same order
        const sorted = [...data].sort((a, b) => {
          if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        setProjects(sorted);
        setLoading(false);
      });
  }, []);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter(p => CATEGORY_FILTER_MAP[p.category] === activeFilter);

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
          {Object.entries(FILTER_LABELS).map(([key, labelKey]) => (
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

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-3 border-white/20 border-t-[#00b4ff] rounded-full animate-spin" />
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} t={t} isRTL={isRTL} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-16 text-muted-foreground">No projects in this category yet.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, t, isRTL }) {
  const [showDeliverables, setShowDeliverables] = useState(false);
  const statusClass = STATUS_COLORS[project.status] || "bg-slate-500/90 text-white border-0 shadow-sm";

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
        {project.previewImage ? (
          <img
            src={project.previewImage}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover opacity-75 group-hover:opacity-85 group-hover:scale-[1.02] transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} flex gap-2 flex-wrap`}>
          <Badge className={`text-xs font-medium px-2.5 py-0.5 ${statusClass}`}>
            {project.status}
          </Badge>
          <Badge className="text-xs bg-black/50 text-white border-0 backdrop-blur-sm">
            {project.category}
          </Badge>
        </div>

        {/* Languages */}
        {project.languages?.length > 0 && (
          <div className={`absolute bottom-3 ${isRTL ? "left-3" : "right-3"} flex items-center gap-1.5`}>
            <Globe className="w-3 h-3 text-white/60" />
            <span className="text-xs text-white/70">{project.languages.join(" · ")}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-foreground mb-1.5">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {project.shortDescription || project.fullDescription}
        </p>

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.map((tech, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[#00b4ff]/8 text-[#00b4ff]/80 border border-[#00b4ff]/15">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Deliverables toggle */}
        {project.deliverables?.length > 0 && (
          <>
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
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "portfolio_live_demo_click", properties: { project: project.title } })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00b4ff] hover:bg-[#0099dd] text-white text-xs font-semibold transition-colors"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              {t("btnViewLiveDemo")}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "portfolio_github_click", properties: { project: project.title } })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-xs font-medium transition-colors border border-white/10"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              GitHub
              <Github className="w-3 h-3" />
            </a>
          )}
          {!project.liveDemoUrl && !project.githubUrl && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground text-xs font-medium border border-border/40">
              {t("btnPreviewSoon")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}