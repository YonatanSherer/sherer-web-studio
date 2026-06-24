import React from "react";
import { Eye, Users, MousePointerClick, MessageCircle, Smartphone, ExternalLink, Clock, Link2 } from "lucide-react";

function Card({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white/3 border border-white/8 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs text-white/40 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export default function AnalyticsSummaryCards({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <Card icon={Eye} label="Total Visits" value={stats.totalVisits} color="bg-[#00b4ff]/15 text-[#00b4ff]" />
      <Card icon={Users} label="Unique Visitors" value={stats.uniqueVisitors} color="bg-purple-500/15 text-purple-400" />
      <Card icon={MousePointerClick} label="Total CTA Clicks" value={stats.totalClicks} color="bg-emerald-500/15 text-emerald-400" />
      <Card icon={MessageCircle} label="WhatsApp Clicks" value={stats.whatsappClicks} color="bg-[#25D366]/15 text-[#25D366]" />
      <Card icon={Smartphone} label="LINE Clicks" value={stats.lineClicks} color="bg-[#06C755]/15 text-[#06C755]" />
      <Card icon={ExternalLink} label="Project Demo Clicks" value={stats.demoClicks} color="bg-amber-500/15 text-amber-400" />
      <Card icon={Link2} label="Top Invite Link" value={stats.topInvite || "—"} color="bg-[#00b4ff]/15 text-[#00b4ff]" />
      <Card icon={Clock} label="Latest Activity" value={stats.latestActivity || "—"} color="bg-white/8 text-white/60" />
    </div>
  );
}