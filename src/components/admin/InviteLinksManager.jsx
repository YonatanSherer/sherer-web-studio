import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Plus, Copy, Check, Trash2, Eye, EyeOff } from "lucide-react";

export default function InviteLinksManager({ links, events, onRefresh }) {
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [copied, setCopied] = useState(null);
  const [saving, setSaving] = useState(false);

  const baseUrl = SITE_CONFIG.portfolio || "https://shererwebstudio.base44.app";

  const statsForCode = (code) => {
    const codeEvents = events.filter((e) => e.inviteCode === code);
    const visits = codeEvents.filter((e) => e.eventType === "visit").length;
    const clicks = codeEvents.filter((e) => e.eventType === "click").length;
    const lastEvent = codeEvents
      .filter((e) => e.created_date)
      .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))[0];
    return { visits, clicks, lastClicked: lastEvent?.created_date || null };
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) return;
    setSaving(true);
    try {
      await base44.entities.InviteLink.create({
        name: newName.trim(),
        code: newCode.trim().toLowerCase().replace(/\s+/g, "-"),
        active: true,
      });
      setNewName("");
      setNewCode("");
      onRefresh();
    } catch {}
    setSaving(false);
  };

  const handleToggle = async (link) => {
    await base44.entities.InviteLink.update(link.id, { active: !link.active });
    onRefresh();
  };

  const handleDelete = async (link) => {
    await base44.entities.InviteLink.delete(link.id);
    onRefresh();
  };

  const copyUrl = (code) => {
    const url = `${baseUrl}/?invite=${code}`;
    navigator.clipboard?.writeText(url);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-6">
      <h3 className="text-sm font-bold text-white mb-1">Invite Links</h3>
      <p className="text-xs text-white/40 mb-4">Create tracking links to share with clients or on social media.</p>

      {/* Create form */}
      <form onSubmit={handleCreate} className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Link name (e.g. LinkedIn campaign)"
          className="flex-1 min-w-40 bg-[#0d1529] border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#00b4ff]/50"
        />
        <input
          type="text"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          placeholder="invite code (e.g. client1)"
          className="w-40 bg-[#0d1529] border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#00b4ff]/50"
        />
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00b4ff] hover:bg-[#0099dd] text-white text-sm font-semibold transition-colors disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </form>

      {/* Table */}
      {links.length === 0 ? (
        <p className="text-xs text-white/30 text-center py-6">No invite links yet. Create one above.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-white/40 border-b border-white/8">
                <th className="text-left py-2 px-2 font-medium">Name</th>
                <th className="text-left py-2 px-2 font-medium">Code</th>
                <th className="text-left py-2 px-2 font-medium">Tracking URL</th>
                <th className="text-center py-2 px-2 font-medium">Visits</th>
                <th className="text-center py-2 px-2 font-medium">Clicks</th>
                <th className="text-left py-2 px-2 font-medium">Last Clicked</th>
                <th className="text-center py-2 px-2 font-medium">Active</th>
                <th className="text-center py-2 px-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => {
                const s = statsForCode(link.code);
                return (
                  <tr key={link.id} className="border-b border-white/5 hover:bg-white/2">
                    <td className="py-2.5 px-2 text-white/80 font-medium">{link.name}</td>
                    <td className="py-2.5 px-2 text-[#00b4ff] font-mono">{link.code}</td>
                    <td className="py-2.5 px-2 text-white/40 font-mono text-[10px] max-w-32 truncate">{baseUrl}/?invite={link.code}</td>
                    <td className="py-2.5 px-2 text-center text-white/70">{s.visits}</td>
                    <td className="py-2.5 px-2 text-center text-white/70">{s.clicks}</td>
                    <td className="py-2.5 px-2 text-white/40 text-[10px]">{s.lastClicked ? new Date(s.lastClicked).toLocaleDateString() : "—"}</td>
                    <td className="py-2.5 px-2 text-center">
                      <button onClick={() => handleToggle(link)} className={`p-1 rounded transition-colors ${link.active ? "text-emerald-400 hover:text-emerald-300" : "text-white/30 hover:text-white/50"}`}>
                        {link.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                    <td className="py-2.5 px-2">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => copyUrl(link.code)} className="p-1 rounded text-white/40 hover:text-[#00b4ff] transition-colors" title="Copy link">
                          {copied === link.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => handleDelete(link)} className="p-1 rounded text-white/40 hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}