import React, { useState, useMemo } from "react";

const ACTION_LABELS = {
  free_quote: "Free Quote",
  view_work: "View Work",
  whatsapp: "WhatsApp",
  line: "LINE",
  linkedin: "LinkedIn",
  github: "GitHub",
  gmail: "Gmail",
  project_demo: "Project Demo",
  language_change: "Language Change",
  package_cta: "Package CTA",
  contact_submit: "Contact Submit",
  final_cta_quote: "Final CTA Quote",
  contact_whatsapp: "Contact WhatsApp",
  contact_line: "Contact LINE",
};

export default function ClickEventsTable({ events }) {
  const [fDateFrom, setFDateFrom] = useState("");
  const [fDateTo, setFDateTo] = useState("");
  const [fInvite, setFInvite] = useState("all");
  const [fAction, setFAction] = useState("all");
  const [fLocation, setFLocation] = useState("");
  const [fDevice, setFDevice] = useState("all");

  const inviteCodes = useMemo(
    () => [...new Set(events.map((e) => e.inviteCode).filter(Boolean))].sort(),
    [events]
  );
  const actionTypes = useMemo(
    () => [...new Set(events.map((e) => e.actionType).filter(Boolean))].sort(),
    [events]
  );

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (fDateFrom && e.created_date && new Date(e.created_date) < new Date(fDateFrom)) return false;
      if (fDateTo && e.created_date && new Date(e.created_date) > new Date(fDateTo + "T23:59:59")) return false;
      if (fInvite !== "all" && e.inviteCode !== fInvite) return false;
      if (fAction !== "all" && e.actionType !== fAction) return false;
      if (fDevice !== "all" && e.deviceType !== fDevice) return false;
      if (fLocation) {
        const loc = `${e.country || ""} ${e.region || ""} ${e.city || ""}`.toLowerCase();
        if (!loc.includes(fLocation.toLowerCase())) return false;
      }
      return true;
    });
  }, [events, fDateFrom, fDateTo, fInvite, fAction, fDevice, fLocation]);

  const selectClass = "bg-[#0d1529] border border-white/10 text-white/70 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#00b4ff]/50";

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-white mb-1">Click & Visit Events</h3>
      <p className="text-xs text-white/40 mb-4">Recent tracking events with filters.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input type="date" value={fDateFrom} onChange={(e) => setFDateFrom(e.target.value)} className={selectClass} />
        <input type="date" value={fDateTo} onChange={(e) => setFDateTo(e.target.value)} className={selectClass} />
        <select value={fInvite} onChange={(e) => setFInvite(e.target.value)} className={selectClass}>
          <option value="all">All Invites</option>
          {inviteCodes.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={fAction} onChange={(e) => setFAction(e.target.value)} className={selectClass}>
          <option value="all">All Actions</option>
          {actionTypes.map((a) => <option key={a} value={a}>{ACTION_LABELS[a] || a}</option>)}
        </select>
        <select value={fDevice} onChange={(e) => setFDevice(e.target.value)} className={selectClass}>
          <option value="all">All Devices</option>
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="mobile">Mobile</option>
        </select>
        <input
          type="text"
          value={fLocation}
          onChange={(e) => setFLocation(e.target.value)}
          placeholder="Country/City..."
          className="bg-[#0d1529] border border-white/10 text-white/70 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#00b4ff]/50 w-32"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-white/40 border-b border-white/8">
              <th className="text-left py-2 px-2 font-medium">Timestamp</th>
              <th className="text-left py-2 px-2 font-medium">Type</th>
              <th className="text-left py-2 px-2 font-medium">Invite</th>
              <th className="text-left py-2 px-2 font-medium">Action</th>
              <th className="text-left py-2 px-2 font-medium">Location</th>
              <th className="text-left py-2 px-2 font-medium">Device</th>
              <th className="text-left py-2 px-2 font-medium">Browser</th>
              <th className="text-left py-2 px-2 font-medium">Lang</th>
              <th className="text-left py-2 px-2 font-medium">Referrer</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-8 text-white/30">No events match your filters.</td>
              </tr>
            ) : (
              filtered.slice(0, 200).map((e) => (
                <tr key={e.id} className="border-b border-white/5 hover:bg-white/2">
                  <td className="py-2 px-2 text-white/50 text-[10px] whitespace-nowrap">
                    {e.created_date ? new Date(e.created_date).toLocaleString() : "—"}
                  </td>
                  <td className="py-2 px-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${e.eventType === "visit" ? "bg-[#00b4ff]/15 text-[#00b4ff]" : "bg-emerald-500/15 text-emerald-400"}`}>
                      {e.eventType}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-[#00b4ff] font-mono text-[10px]">{e.inviteCode || "—"}</td>
                  <td className="py-2 px-2 text-white/70">{e.actionType ? (ACTION_LABELS[e.actionType] || e.actionType) : "—"}</td>
                  <td className="py-2 px-2 text-white/50 text-[10px] whitespace-nowrap">
                    {[e.city, e.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="py-2 px-2 text-white/50">{e.deviceType || "—"}</td>
                  <td className="py-2 px-2 text-white/50">{e.browser || "—"}</td>
                  <td className="py-2 px-2 text-white/50">{e.language || "—"}</td>
                  <td className="py-2 px-2 text-white/30 text-[10px] max-w-24 truncate">{e.referrer || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {filtered.length > 200 && (
        <p className="text-xs text-white/30 mt-2 text-center">Showing 200 of {filtered.length} events.</p>
      )}
    </div>
  );
}