import React, { useState } from "react";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { useLang } from "@/lib/LanguageContext";
import { base44 } from "@/api/base44Client";

const WhatsAppIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LINEIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
  </svg>
);

export default function FloatingButtons() {
  const { t } = useLang();
  const [lineHover, setLineHover] = useState(false);
  const [waHover, setWaHover] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 md:bottom-7 md:right-7">
      {/* LINE button */}
      <div className="relative flex items-center">
        {lineHover && (
          <div className="absolute right-14 bg-[#060a14] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-white/10 pointer-events-none">
            {t("floatLINE")}
            <div className="absolute top-1/2 right-0 translate-x-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#060a14] border-r border-t border-white/10" />
          </div>
        )}
        <a
          href={SITE_CONFIG.line}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => base44.analytics.track({ eventName: "line_click", properties: { location: "floating" } })}
          onMouseEnter={() => setLineHover(true)}
          onMouseLeave={() => setLineHover(false)}
          className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#06C755] shadow-lg shadow-[#06C755]/25 flex items-center justify-center text-white hover:scale-110 hover:shadow-[#06C755]/40 transition-all duration-200 active:scale-95"
          aria-label={t("floatLINE")}
        >
          <LINEIcon size={20} />
        </a>
      </div>

      {/* WhatsApp button */}
      <div className="relative flex items-center">
        {waHover && (
          <div className="absolute right-16 bg-[#060a14] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-white/10 pointer-events-none">
            {t("floatWhatsApp")}
            <div className="absolute top-1/2 right-0 translate-x-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#060a14] border-r border-t border-white/10" />
          </div>
        )}
        <a
          href={SITE_CONFIG.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => base44.analytics.track({ eventName: "whatsapp_click", properties: { location: "floating" } })}
          onMouseEnter={() => setWaHover(true)}
          onMouseLeave={() => setWaHover(false)}
          className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/25 flex items-center justify-center text-white hover:scale-110 hover:shadow-[#25D366]/40 transition-all duration-200 active:scale-95"
          style={{ width: "52px", height: "52px" }}
          aria-label={t("floatWhatsApp")}
        >
          <WhatsAppIcon size={24} />
        </a>
      </div>
    </div>
  );
}