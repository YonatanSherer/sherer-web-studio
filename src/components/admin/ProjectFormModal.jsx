import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { X, Plus, Trash2, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["Business Website", "Multilingual Website", "Web Application", "Landing Page", "AI Tool", "Learning App", "Productivity App", "Portfolio"];
const STATUSES = ["Live Demo", "Demo Project", "Coming Soon", "Case Study"];

const STATUS_COLORS = {
  "Live Demo": "bg-emerald-500/90 text-white",
  "Demo Project": "bg-[#00b4ff]/90 text-white",
  "Coming Soon": "bg-amber-500/90 text-white",
  "Case Study": "bg-purple-500/90 text-white",
};

const EMPTY = {
  title: "", shortDescription: "", fullDescription: "",
  category: "Business Website", status: "Demo Project",
  previewImage: "", liveDemoUrl: "", githubUrl: "", showGithubButton: false,
  technologies: [], languages: [], deliverables: [],
  featured: false, active: true, displayOrder: 0,
};

function TagInput({ label, values, onChange }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (v && !values.includes(v)) { onChange([...values, v]); }
    setInput("");
  };
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i));
  return (
    <div>
      <label className="block text-xs font-medium text-white/60 mb-1.5">{label}</label>
      <div className="flex gap-2 mb-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder={`Add ${label.toLowerCase()}...`}
          className="bg-[#0d1529] border-white/10 text-white text-xs h-8"
        />
        <Button type="button" size="sm" onClick={add} className="h-8 px-3 bg-[#00b4ff] hover:bg-[#0099dd] text-white">
          <Plus className="w-3 h-3" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/8 text-white/70 text-xs border border-white/10">
            {v}
            <button type="button" onClick={() => remove(i)} className="text-white/40 hover:text-red-400 ml-0.5">
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function PreviewCard({ data }) {
  const statusColor = STATUS_COLORS[data.status] || "bg-slate-500/90 text-white";
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1529]">
      <div className="relative h-36 bg-gradient-to-br from-slate-700 to-slate-800">
        {data.previewImage ? (
          <img src={data.previewImage} alt="" className="w-full h-full object-cover opacity-70" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}>{data.status || "Status"}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/50 text-white/80">{data.category || "Category"}</span>
        </div>
        {data.languages?.length > 0 && (
          <div className="absolute bottom-2 right-2 text-xs text-white/60">{data.languages.join(" · ")}</div>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-bold text-white">{data.title || "Project Title"}</p>
        <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{data.shortDescription || "Short description..."}</p>
      </div>
    </div>
  );
}

export default function ProjectFormModal({ project, onClose, onSaved }) {
  const [form, setForm] = useState(project ? { ...project } : { ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const isEdit = !!project;

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set("previewImage", file_url);
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (isEdit) {
      await base44.entities.PortfolioProject.update(project.id, form);
    } else {
      await base44.entities.PortfolioProject.create(form);
    }
    setSaving(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#0a0e1a] border border-white/10 rounded-2xl shadow-2xl mb-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h2 className="text-base font-bold text-white">{isEdit ? "Edit Project" : "Add New Project"}</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/8 transition-colors border border-white/10"
            >
              <Eye className="w-3.5 h-3.5" />
              {showPreview ? "Hide Preview" : "Live Preview"}
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* LEFT COLUMN */}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Title *</label>
                <Input required value={form.title} onChange={e => set("title", e.target.value)}
                  className="bg-[#0d1529] border-white/10 text-white" placeholder="Project title" />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Short Description</label>
                <textarea
                  value={form.shortDescription}
                  onChange={e => set("shortDescription", e.target.value)}
                  rows={2}
                  className="w-full rounded-lg bg-[#0d1529] border border-white/10 text-white text-sm px-3 py-2 placeholder:text-white/30 focus:outline-none focus:border-[#00b4ff]/50 resize-none"
                  placeholder="One-line description for the card..."
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Full Description</label>
                <textarea
                  value={form.fullDescription}
                  onChange={e => set("fullDescription", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg bg-[#0d1529] border border-white/10 text-white text-sm px-3 py-2 placeholder:text-white/30 focus:outline-none focus:border-[#00b4ff]/50 resize-none"
                  placeholder="Detailed description..."
                />
              </div>

              {/* Category + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Category *</label>
                  <select
                    required
                    value={form.category}
                    onChange={e => set("category", e.target.value)}
                    className="w-full rounded-lg bg-[#0d1529] border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-[#00b4ff]/50"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Status *</label>
                  <select
                    required
                    value={form.status}
                    onChange={e => set("status", e.target.value)}
                    className="w-full rounded-lg bg-[#0d1529] border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-[#00b4ff]/50"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Display Order + Flags */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Display Order</label>
                  <Input type="number" value={form.displayOrder} onChange={e => set("displayOrder", Number(e.target.value))}
                    className="bg-[#0d1529] border-white/10 text-white" />
                </div>
                <div className="flex flex-col gap-2 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-white/60">
                    <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)}
                      className="rounded accent-[#00b4ff]" />
                    Featured
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-white/60">
                    <input type="checkbox" checked={form.active} onChange={e => set("active", e.target.checked)}
                      className="rounded accent-[#00b4ff]" />
                    Active
                  </label>
                </div>
              </div>

              {/* URLs */}
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Live Demo URL</label>
                <Input value={form.liveDemoUrl || ""} onChange={e => set("liveDemoUrl", e.target.value)}
                  className="bg-[#0d1529] border-white/10 text-white" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">GitHub Repository URL</label>
                <Input value={form.githubUrl || ""} onChange={e => set("githubUrl", e.target.value)}
                  className="bg-[#0d1529] border-white/10 text-white" placeholder="https://github.com/YonatanSherer/project-name" />
                <label className="flex items-center gap-2 cursor-pointer text-xs text-white/60 mt-2">
                  <input type="checkbox" checked={form.showGithubButton || false} onChange={e => set("showGithubButton", e.target.checked)}
                    className="rounded accent-[#00b4ff]" />
                  Show GitHub Button
                </label>
                <p className="text-[10px] text-white/30 mt-1">Show this only when the repository is ready to be public.</p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4">
              {/* Image */}
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Preview Image</label>
                <Input value={form.previewImage || ""} onChange={e => set("previewImage", e.target.value)}
                  className="bg-[#0d1529] border-white/10 text-white mb-2" placeholder="https://... or upload below" />
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-white/15 text-white/40 hover:border-[#00b4ff]/40 hover:text-white/60 transition-colors cursor-pointer text-xs">
                  <Upload className="w-3.5 h-3.5" />
                  {uploading ? "Uploading..." : "Upload image"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
                {form.previewImage && (
                  <img src={form.previewImage} alt="" className="mt-2 w-full h-28 object-cover rounded-lg opacity-70" />
                )}
              </div>

              {/* Tag Inputs */}
              <TagInput label="Technologies" values={form.technologies || []} onChange={v => set("technologies", v)} />
              <TagInput label="Languages" values={form.languages || []} onChange={v => set("languages", v)} />
              <TagInput label="Deliverables" values={form.deliverables || []} onChange={v => set("deliverables", v)} />

              {/* Live Preview */}
              {showPreview && (
                <div>
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Card Preview</p>
                  <PreviewCard data={form} />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/8">
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/8 transition-colors border border-white/10">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#00b4ff] hover:bg-[#0099dd] text-white text-sm font-semibold transition-colors disabled:opacity-60">
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}