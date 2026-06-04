import React from "react";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:bottom-8 md:right-8">
      <a
        href={SITE_CONFIG.line}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => base44.analytics.track({ eventName: "line_click", properties: { location: "floating" } })}
        className="w-12 h-12 rounded-full bg-[#00B900] shadow-lg shadow-[#00B900]/30 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Contact on LINE"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </a>
      <a
        href={SITE_CONFIG.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => base44.analytics.track({ eventName: "whatsapp_click", properties: { location: "floating" } })}
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}