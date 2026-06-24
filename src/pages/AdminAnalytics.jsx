import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import AdminGuard from "@/components/admin/AdminGuard";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import AnalyticsSummaryCards from "@/components/admin/AnalyticsSummaryCards";
import InviteLinksManager from "@/components/admin/InviteLinksManager";
import ClickEventsTable from "@/components/admin/ClickEventsTable";

function AdminAnalyticsContent() {
  const [events, setEvents] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [eventData, linkData] = await Promise.all([
        base44.entities.AnalyticsEvent.list("-created_date", 500),
        base44.entities.InviteLink.list(),
      ]);
      setEvents(eventData);
      setLinks(linkData);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const stats = useMemo(() => {
    const visits = events.filter((e) => e.eventType === "visit");
    const clicks = events.filter((e) => e.eventType === "click");
    const uniqueVisitors = new Set(visits.map((e) => e.sessionId).filter(Boolean)).size;
    const whatsappClicks = clicks.filter((e) => e.actionType?.includes("whatsapp")).length;
    const lineClicks = clicks.filter((e) => e.actionType?.includes("line")).length;
    const demoClicks = clicks.filter((e) => e.actionType === "project_demo").length;

    // Top invite link
    const inviteCounts = {};
    visits.forEach((e) => {
      const code = e.inviteCode || "direct";
      inviteCounts[code] = (inviteCounts[code] || 0) + 1;
    });
    const topInvite = Object.entries(inviteCounts).sort((a, b) => b[1] - a[1])[0];

    // Latest activity
    const latest = events
      .filter((e) => e.created_date)
      .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))[0];

    return {
      totalVisits: visits.length,
      uniqueVisitors,
      totalClicks: clicks.length,
      whatsappClicks,
      lineClicks,
      demoClicks,
      topInvite: topInvite ? `${topInvite[0]} (${topInvite[1]})` : null,
      latestActivity: latest ? new Date(latest.created_date).toLocaleDateString() : null,
    };
  }, [events]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060a14] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/10 border-t-[#00b4ff] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060a14] text-white">
      {/* Header */}
      <div className="border-b border-white/8 bg-[#0a0e1a]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/projects" className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio Admin</span>
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <h1 className="text-base font-bold text-white">Analytics / Invite Tracking</h1>
          </div>
          <Link to="/" className="text-white/40 hover:text-white transition-colors text-sm">
            Back to Site
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Privacy note */}
        <div className="flex items-start gap-2 mb-6 text-xs text-white/40 bg-white/3 border border-white/8 rounded-xl p-3">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#00b4ff]/60" />
          <p>
            Location data is approximate (IP-based) and may be inaccurate. Only anonymous visit and click analytics are tracked — no personal data, passwords, or precise GPS location is collected.
          </p>
        </div>

        <AnalyticsSummaryCards stats={stats} />
        <InviteLinksManager links={links} events={events} onRefresh={load} />
        <ClickEventsTable events={events} />
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  return (
    <AdminGuard>
      <AdminAnalyticsContent />
    </AdminGuard>
  );
}