import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { DEFAULT_BRAND_CONFIG, DEFAULT_ALT_TEXT } from "@/lib/useBrandSettings";
import { Upload, RotateCcw, Save, Check, AlertTriangle } from "lucide-react";

const KEYS = {
  url: "brand_logo_url",
  alt: "brand_logo_alt",
  config: "brand_logo_config",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const PREFERRED_TYPES = ["image/svg+xml", "image/png", "image/webp"];

const RADIUS_OPTIONS = [
  { value: "none", label: "None" },
  { value: "rounded", label: "Rounded" },
  { value: "full", label: "Full Rounded" },
];

const BG_OPTIONS = [
  { value: "transparent", label: "Transparent" },
  { value: "dark", label: "Dark Square" },
  { value: "glow", label: "Subtle Glow" },
];

const RADIUS_CLASS = {
  none: "rounded-none",
  rounded: "rounded-lg",
  full: "rounded-full",
};

const BG_CLASS = {
  transparent: "",
  dark: "bg-[#0a0e1a]",
  glow: "bg-[#00b4ff]/10 shadow-[0_0_12px_rgba(0,180,255,0.3)]",
};

export default function BrandSettings() {
  const [logoUrl, setLogoUrl] = useState(null);
  const [altText, setAltText] = useState(DEFAULT_ALT_TEXT);
  const [config, setConfig] = useState(DEFAULT_BRAND_CONFIG);
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    base44.entities.SiteSettings.filter({}).then((all) => {
      const map = {};
      all.forEach((r) => {
        map[r.key] = r;
        if (r.key === KEYS.url) setLogoUrl(r.value || null);
        if (r.key === KEYS.alt) setAltText(r.value || DEFAULT_ALT_TEXT);
        if (r.key === KEYS.config) {
          try {
            setConfig((prev) => ({ ...prev, ...JSON.parse(r.value) }));
          } catch {}
        }
      });
      setRecords(map);
      setLoading(false);
    });
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setWarning("");

    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 2MB.");
      return;
    }

    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      setWarning("JPG detected. For best results, use a PNG, SVG, or WebP with a transparent background.");
    } else if (!PREFERRED_TYPES.includes(file.type)) {
      setWarning(`Format "${file.type || "unknown"}" may not be ideal. Recommended: SVG, PNG, or WebP with transparent background.`);
    }

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setLogoUrl(file_url);
    } catch (err) {
      setError("Upload failed. Please try again.");
    }
    setUploading(false);
  };

  const persistSetting = async (key, value) => {
    const existing = records[key];
    if (existing) {
      await base44.entities.SiteSettings.update(existing.id, { value });
      setRecords((prev) => ({ ...prev, [key]: { ...existing, value } }));
    } else {
      const created = await base44.entities.SiteSettings.create({ key, value });
      setRecords((prev) => ({ ...prev, [key]: created }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await Promise.all([
        persistSetting(KEYS.url, logoUrl || ""),
        persistSetting(KEYS.alt, altText || DEFAULT_ALT_TEXT),
        persistSetting(KEYS.config, JSON.stringify(config)),
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError("Failed to save settings. Please try again.");
    }
    setSaving(false);
  };

  const handleReset = async () => {
    setLogoUrl(null);
    setAltText(DEFAULT_ALT_TEXT);
    setConfig(DEFAULT_BRAND_CONFIG);
    setWarning("");
    setError("");
    if (fileRef.current) fileRef.current.value = "";
    setSaving(true);
    try {
      await Promise.all([
        persistSetting(KEYS.url, ""),
        persistSetting(KEYS.alt, DEFAULT_ALT_TEXT),
        persistSetting(KEYS.config, JSON.stringify(DEFAULT_BRAND_CONFIG)),
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError("Failed to reset settings.");
    }
    setSaving(false);
  };

  const previewImg = (size) =>
    logoUrl ? (
      <img
        src={logoUrl}
        alt={altText}
        style={{ width: size, height: size }}
        className={`object-contain flex-shrink-0 ${RADIUS_CLASS[config.borderRadius] || ""} ${BG_CLASS[config.background] || ""}`}
      />
    ) : (
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center text-white/30 text-xs flex-shrink-0 ${RADIUS_CLASS[config.borderRadius] || ""} ${BG_CLASS[config.background] || ""}`}
      >
        No logo
      </div>
    );

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-6">
      <h2 className="text-sm font-bold text-white mb-1">Brand Settings</h2>
      <p className="text-xs text-white/40 mb-4">Upload and configure the website logo shown in the header.</p>

      {/* Upload */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Logo Upload</label>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="cursor-pointer">
            <input
              ref={fileRef}
              type="file"
              accept="image/svg+xml,image/png,image/webp,image/jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00b4ff]/15 text-[#00b4ff] text-sm font-medium hover:bg-[#00b4ff]/25 transition-colors border border-[#00b4ff]/20">
              <Upload className="w-3.5 h-3.5" />
              {uploading ? "Uploading…" : "Choose Image"}
            </span>
          </label>
          <span className="text-xs text-white/40">SVG, PNG, WebP preferred · Max 2MB · 512×512 or 1024×1024 recommended</span>
        </div>
        {warning && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            {warning}
          </div>
        )}
        {error && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Alt text */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Logo Alt Text</label>
        <input
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Sherer Web Studio Logo"
          className="w-full bg-[#0d1529] border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#00b4ff]/50"
        />
      </div>

      {/* Size controls */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Logo Size Controls</label>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>Desktop size</span>
              <span className="text-white/70 font-mono">{config.desktopSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="64"
              value={config.desktopSize}
              onChange={(e) => setConfig({ ...config, desktopSize: Number(e.target.value) })}
              className="w-full accent-[#00b4ff]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>Mobile size</span>
              <span className="text-white/70 font-mono">{config.mobileSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="48"
              value={config.mobileSize}
              onChange={(e) => setConfig({ ...config, mobileSize: Number(e.target.value) })}
              className="w-full accent-[#00b4ff]"
            />
          </div>
          <div>
            <div className="text-xs text-white/50 mb-1">Border radius</div>
            <select
              value={config.borderRadius}
              onChange={(e) => setConfig({ ...config, borderRadius: e.target.value })}
              className="w-full bg-[#0d1529] border border-white/10 text-white/70 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#00b4ff]/50"
            >
              {RADIUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-xs text-white/50 mb-1">Logo background</div>
            <select
              value={config.background}
              onChange={(e) => setConfig({ ...config, background: e.target.value })}
              className="w-full bg-[#0d1529] border border-white/10 text-white/70 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#00b4ff]/50"
            >
              {BG_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Brand Text Font Size */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Header Brand Text Font Size</label>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>Desktop</span>
              <span className="text-white/70 font-mono">{config.brandTextDesktop}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="32"
              value={config.brandTextDesktop}
              onChange={(e) => setConfig({ ...config, brandTextDesktop: Number(e.target.value) })}
              className="w-full accent-[#00b4ff]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>Tablet</span>
              <span className="text-white/70 font-mono">{config.brandTextTablet}px</span>
            </div>
            <input
              type="range"
              min="15"
              max="28"
              value={config.brandTextTablet}
              onChange={(e) => setConfig({ ...config, brandTextTablet: Number(e.target.value) })}
              className="w-full accent-[#00b4ff]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>Mobile</span>
              <span className="text-white/70 font-mono">{config.brandTextMobile}px</span>
            </div>
            <input
              type="range"
              min="14"
              max="24"
              value={config.brandTextMobile}
              onChange={(e) => setConfig({ ...config, brandTextMobile: Number(e.target.value) })}
              className="w-full accent-[#00b4ff]"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setConfig({ ...config, brandTextDesktop: 20, brandTextTablet: 18, brandTextMobile: 16 })}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-xs font-medium transition-colors border border-white/10 mt-3"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Font Sizes
        </button>
        {/* Live preview */}
        <div className="mt-3 bg-[#0a0e1a] rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 h-10">
            {previewImg(config.desktopSize)}
            <span className="text-white font-bold tracking-tight" style={{ fontSize: `${config.brandTextDesktop}px` }}>Sherer Web Studio</span>
          </div>
        </div>
      </div>

      {/* Previews */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Preview</label>
        <div className="grid sm:grid-cols-3 gap-3">
          {/* Dark bg */}
          <div className="bg-[#0a0e1a] rounded-xl p-4 flex items-center justify-center min-h-20 border border-white/5">
            {previewImg(config.desktopSize)}
          </div>
          {/* Light bg */}
          <div className="bg-white rounded-xl p-4 flex items-center justify-center min-h-20 border border-white/10">
            {previewImg(config.desktopSize)}
          </div>
          {/* Header preview */}
          <div className="bg-[#0a0e1a] rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-2 h-10">
              {previewImg(config.desktopSize)}
              <span className="text-white text-sm font-bold tracking-tight">Sherer Web Studio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-white/8">
        <button
          onClick={handleSave}
          disabled={saving || uploading || loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00b4ff] hover:bg-[#0099dd] text-white text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
        <button
          onClick={handleReset}
          disabled={saving || loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-sm font-medium transition-colors border border-white/10 disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to Default
        </button>
      </div>
    </div>
  );
}