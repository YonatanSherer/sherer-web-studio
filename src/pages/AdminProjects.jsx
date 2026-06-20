import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AdminGuard from "@/components/admin/AdminGuard";
import ProjectFormModal from "@/components/admin/ProjectFormModal";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Copy, Eye, EyeOff, Star, ChevronUp, ChevronDown, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import PortfolioDisplaySettings from "@/components/admin/PortfolioDisplaySettings";

const STATUS_COLORS = {
  "Live Demo": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Demo Project": "bg-[#00b4ff]/15 text-[#00b4ff] border-[#00b4ff]/20",
  "Coming Soon": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Case Study": "bg-purple-400/15 text-purple-400 border-purple-400/20",
};

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#0d1529] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <p className="text-white text-sm mb-5">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/8 border border-white/10 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, onEdit, onDuplicate, onDelete, onToggleActive, onToggleFeatured, onChangeOrder }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border transition-all ${
      project.active ? "bg-white/3 border-white/8 hover:border-white/15" : "bg-white/1 border-white/5 opacity-60"
    }`}>
      {/* Preview thumb */}
      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
        {project.previewImage ? (
          <img src={project.previewImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-white truncate">{project.title}</span>
          {project.featured && (
            <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[project.status] || "bg-white/8 text-white/50 border-white/10"}`}>
            {project.status}
          </span>
        </div>
        <p className="text-xs text-white/40 mt-0.5">{project.category} · Order: {project.displayOrder}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 flex-shrink-0 flex-wrap">
        <button onClick={() => onChangeOrder(project, -1)} title="Move up"
          className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onChangeOrder(project, 1)} title="Move down"
          className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onToggleFeatured(project)} title={project.featured ? "Unfeature" : "Feature"}
          className={`p-1.5 rounded-lg transition-colors ${project.featured ? "text-amber-400 hover:text-amber-300 bg-amber-400/10" : "text-white/40 hover:text-amber-400 hover:bg-white/8"}`}>
          <Star className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onToggleActive(project)} title={project.active ? "Hide" : "Show"}
          className={`p-1.5 rounded-lg transition-colors ${project.active ? "text-emerald-400 hover:text-emerald-300 bg-emerald-400/10" : "text-white/40 hover:text-emerald-400 hover:bg-white/8"}`}>
          {project.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button onClick={() => onEdit(project)} title="Edit"
          className="p-1.5 rounded-lg text-white/40 hover:text-[#00b4ff] hover:bg-[#00b4ff]/8 transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDuplicate(project)} title="Duplicate"
          className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(project)} title="Delete"
          className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/8 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function AdminProjectsContent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterActive, setFilterActive] = useState("all");
  const [modalProject, setModalProject] = useState(undefined); // undefined = closed, null = new, obj = edit
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.PortfolioProject.list("displayOrder", 100);
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaved = () => {
    setModalProject(undefined);
    load();
    showToast("Project saved successfully!");
  };

  const handleDelete = async () => {
    await base44.entities.PortfolioProject.delete(confirmDelete.id);
    setConfirmDelete(null);
    load();
    showToast("Project deleted.", "error");
  };

  const handleDuplicate = async (p) => {
    const { id, created_date, updated_date, created_by_id, ...rest } = p;
    await base44.entities.PortfolioProject.create({ ...rest, title: rest.title + " (copy)", active: false });
    load();
    showToast("Project duplicated!");
  };

  const handleToggleActive = async (p) => {
    await base44.entities.PortfolioProject.update(p.id, { active: !p.active });
    load();
    showToast(`Project ${!p.active ? "activated" : "hidden"}.`);
  };

  const handleToggleFeatured = async (p) => {
    await base44.entities.PortfolioProject.update(p.id, { featured: !p.featured });
    load();
    showToast(`Project ${!p.featured ? "featured" : "unfeatured"}.`);
  };

  const handleChangeOrder = async (p, dir) => {
    await base44.entities.PortfolioProject.update(p.id, { displayOrder: p.displayOrder + dir });
    load();
  };

  // Derived categories + statuses for filter selects
  const allCats = [...new Set(projects.map(p => p.category))].filter(Boolean);
  const allStatuses = [...new Set(projects.map(p => p.status))].filter(Boolean);

  const filtered = projects.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.title?.toLowerCase().includes(q) || p.shortDescription?.toLowerCase().includes(q);
    const matchCat = filterCat === "all" || p.category === filterCat;
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    const matchActive = filterActive === "all" || (filterActive === "active" ? p.active : !p.active);
    return matchQ && matchCat && matchStatus && matchActive;
  });

  const activeCount = projects.filter(p => p.active).length;

  return (
    <div className="min-h-screen bg-[#060a14] text-white">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl shadow-xl text-sm font-medium ${
          toast.type === "error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-white/8 bg-[#0a0e1a]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <h1 className="text-base font-bold text-white">Portfolio Admin</h1>
            <span className="hidden sm:inline text-xs text-white/30">{activeCount} active · {projects.length} total</span>
          </div>
          <button
            onClick={() => setModalProject(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00b4ff] hover:bg-[#0099dd] text-white text-sm font-semibold transition-colors shadow-lg shadow-[#00b4ff]/20"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <PortfolioDisplaySettings />
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="pl-9 bg-[#0d1529] border-white/10 text-white placeholder:text-white/25 h-9 text-sm"
            />
          </div>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="bg-[#0d1529] border border-white/10 text-white/70 text-sm rounded-lg px-3 h-9 focus:outline-none focus:border-[#00b4ff]/50">
            <option value="all">All Categories</option>
            {allCats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#0d1529] border border-white/10 text-white/70 text-sm rounded-lg px-3 h-9 focus:outline-none focus:border-[#00b4ff]/50">
            <option value="all">All Statuses</option>
            {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterActive} onChange={e => setFilterActive(e.target.value)}
            className="bg-[#0d1529] border border-white/10 text-white/70 text-sm rounded-lg px-3 h-9 focus:outline-none focus:border-[#00b4ff]/50">
            <option value="all">Active + Hidden</option>
            <option value="active">Active only</option>
            <option value="hidden">Hidden only</option>
          </select>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-white/10 border-t-[#00b4ff] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            {projects.length === 0 ? "No projects yet. Add your first project!" : "No projects match your filters."}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(p => (
              <ProjectRow
                key={p.id}
                project={p}
                onEdit={setModalProject}
                onDuplicate={handleDuplicate}
                onDelete={setConfirmDelete}
                onToggleActive={handleToggleActive}
                onToggleFeatured={handleToggleFeatured}
                onChangeOrder={handleChangeOrder}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {modalProject !== undefined && (
        <ProjectFormModal
          project={modalProject}
          onClose={() => setModalProject(undefined)}
          onSaved={handleSaved}
        />
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <ConfirmDialog
          message={`Delete "${confirmDelete.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

export default function AdminProjects() {
  return (
    <AdminGuard>
      <AdminProjectsContent />
    </AdminGuard>
  );
}