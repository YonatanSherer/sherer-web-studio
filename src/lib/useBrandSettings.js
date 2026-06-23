import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

export const DEFAULT_BRAND_CONFIG = {
  desktopSize: 32,
  mobileSize: 26,
  borderRadius: "rounded",
  background: "transparent",
};

export const DEFAULT_ALT_TEXT = "Sherer Web Studio Logo";

/**
 * Loads brand logo settings from SiteSettings.
 * Returns logoUrl (null if none), altText, config, and loading state.
 */
export function useBrandSettings() {
  const [logoUrl, setLogoUrl] = useState(null);
  const [altText, setAltText] = useState(DEFAULT_ALT_TEXT);
  const [config, setConfig] = useState(DEFAULT_BRAND_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SiteSettings.filter({})
      .then((results) => {
        results.forEach((r) => {
          if (r.key === "brand_logo_url") setLogoUrl(r.value || null);
          if (r.key === "brand_logo_alt") setAltText(r.value || DEFAULT_ALT_TEXT);
          if (r.key === "brand_logo_config") {
            try {
              setConfig((prev) => ({ ...prev, ...JSON.parse(r.value) }));
            } catch {}
          }
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { logoUrl, altText, config, loading };
}