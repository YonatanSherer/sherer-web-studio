import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const BADGE_KEY = "portfolio_show_badges";
const FILTERS_KEY = "portfolio_visible_filters";

const ALL_FILTERS = [
  { key: "all", label: "All" },
  { key: "business", label: "Business Websites" },
  { key: "multilingual", label: "Multilingual" },
  { key: "webApp", label: "Web Apps" },
];

const DEFAULT_FILTERS = { all: true, business: true, multilingual: true, webApp: true };

function Toggle({ value, onChange, disabled }) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      aria-pressed={value}
      className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4ff] ${
        value ? "bg-[#00b4ff]" : "bg-white/15"
      } disabled:opacity-50`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
          value ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SettingRow({ label, description, value, onChange, disabled }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/6 last:border-0">
      <div>
        <p className="text-sm text-white font-medium">{label}</p>
        {description && <p className="text-xs text-white/40 mt-0.5">{description}</p>}
      </div>
      <Toggle value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
}

export default function PortfolioDisplaySettings() {
  const [records, setRecords] = useState({});  // key → { id, value }
  const [showBadges, setShowBadges] = useState(true);
  const [visibleFilters, setVisibleFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.entities.SiteSettings.filter({}).then((all) => {
      const map = {};
      all.forEach(r => { map[r.key] = r; });
      setRecords(map);
      if (map[BADGE_KEY]) setShowBadges(map[BADGE_KEY].value !== "false");
      if (map[FILTERS_KEY]) {
        try { setVisibleFilters({ ...DEFAULT_FILTERS, ...JSON.parse(map[FILTERS_KEY].value) }); } catch {}
      }
      setLoading(false);
    });
  }, []);

  const saveSetting = async (key, value) => {
    setSaving(true);
    const existing = records[key];
    if (existing) {
      await base44.entities.SiteSettings.update(existing.id, { value });
      setRecords(prev => ({ ...prev, [key]: { ...existing, value } }));
    } else {
      const created = await base44.entities.SiteSettings.create({ key, value });
      setRecords(prev => ({ ...prev, [key]: created }));
    }
    setSaving(false);
  };

  const handleBadgeToggle = async () => {
    const next = !showBadges;
    setShowBadges(next);
    await saveSetting(BADGE_KEY, String(next));
  };

  const handleFilterToggle = async (filterKey) => {
    const next = { ...visibleFilters, [filterKey]: !visibleFilters[filterKey] };
    setVisibleFilters(next);
    await saveSetting(FILTERS_KEY, JSON.stringify(next));
  };

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-6">
      <h2 className="text-sm font-bold text-white mb-1">Portfolio Display Settings</h2>
      <p className="text-xs text-white/40 mb-4">Control how projects appear on the public website.</p>

      {/* Badges toggle */}
      <SettingRow
        label="Show project badges on cards"
        description='Show or hide the small badges on each project image (e.g. "Demo Project", "Business Website").'
        value={showBadges}
        onChange={handleBadgeToggle}
        disabled={loading || saving}
      />

      {/* Category filter toggles */}
      <div className="mt-4 pt-4 border-t border-white/8">
        <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Category Filter Buttons</p>
        <p className="text-xs text-white/40 mb-3">Choose which filter buttons appear above the project grid.</p>
        {ALL_FILTERS.map(f => (
          <SettingRow
            key={f.key}
            label={`Show "${f.label}" filter`}
            value={visibleFilters[f.key] ?? true}
            onChange={() => handleFilterToggle(f.key)}
            disabled={loading || saving}
          />
        ))}
      </div>

      {saving && <p className="text-xs text-[#00b4ff] mt-3">Saving…</p>}
    </div>
  );
}