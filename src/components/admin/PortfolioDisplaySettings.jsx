import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const BADGE_KEY = "portfolio_show_badges";

export default function PortfolioDisplaySettings() {
  const [showBadges, setShowBadges] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingId, setSettingId] = useState(null);

  useEffect(() => {
    base44.entities.SiteSettings.filter({ key: BADGE_KEY }).then((results) => {
      if (results.length > 0) {
        setSettingId(results[0].id);
        setShowBadges(results[0].value !== "false");
      }
      setLoading(false);
    });
  }, []);

  const handleToggle = async () => {
    const newValue = !showBadges;
    setSaving(true);
    if (settingId) {
      await base44.entities.SiteSettings.update(settingId, { value: String(newValue) });
    } else {
      const created = await base44.entities.SiteSettings.create({ key: BADGE_KEY, value: String(newValue) });
      setSettingId(created.id);
    }
    setShowBadges(newValue);
    setSaving(false);
  };

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-6">
      <h2 className="text-sm font-bold text-white mb-1">Portfolio Display Settings</h2>
      <p className="text-xs text-white/40 mb-4">Control how project cards appear on the public website.</p>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white font-medium">Show project badges on cards</p>
          <p className="text-xs text-white/40 mt-0.5">
            Show or hide the small badges on each project image (e.g. "Demo Project", "Business Website").
          </p>
        </div>

        <button
          onClick={handleToggle}
          disabled={loading || saving}
          aria-pressed={showBadges}
          className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4ff] ${
            showBadges ? "bg-[#00b4ff]" : "bg-white/15"
          } disabled:opacity-50`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
              showBadges ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {saving && (
        <p className="text-xs text-[#00b4ff] mt-3">Saving…</p>
      )}
    </div>
  );
}