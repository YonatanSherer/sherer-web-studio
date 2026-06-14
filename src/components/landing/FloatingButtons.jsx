import React, { useState } from "react";
import { CONTACT_LINKS } from "@/lib/siteConfig";
import { useLang } from "@/lib/LanguageContext";
import { base44 } from "@/api/base44Client";
import { X, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const WhatsAppIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LINEIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
  </svg>
);

const LinkedInIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const GmailIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

// Single floating button with tooltip
function FloatBtn({ href, label, bgClass, iconColor, children, onClick, tooltip, isRTL }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative flex items-center group">
      {hovered && (
        <div className={`absolute ${isRTL ? "left-14" : "right-14"} bg-[#060a14] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-white/10 pointer-events-none z-10`}>
          {tooltip}
          {isRTL
            ? <div className="absolute top-1/2 left-0 -translate-x-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#060a14] border-l border-b border-white/10" />
            : <div className="absolute top-1/2 right-0 translate-x-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#060a14] border-r border-t border-white/10" />
          }
        </div>
      )}
      <a
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
        aria-label={label}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-10 h-10 rounded-full ${bgClass} shadow-lg flex items-center justify-center ${iconColor} hover:scale-110 transition-all duration-200 active:scale-95`}
      >
        {children}
      </a>
    </div>
  );
}

export default function FloatingButtons() {
  const { t, isRTL } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  const buttons = [
    {
      href: CONTACT_LINKS.whatsapp,
      label: t("floatWhatsApp"),
      tooltip: t("floatWhatsApp"),
      bgClass: "bg-[#25D366] shadow-[#25D366]/25 hover:shadow-[#25D366]/40",
      iconColor: "text-white",
      icon: <WhatsAppIcon size={20} />,
      track: () => base44.analytics.track({ eventName: "whatsapp_click", properties: { location: "floating" } }),
    },
    {
      href: CONTACT_LINKS.line,
      label: t("floatLINE"),
      tooltip: t("floatLINE"),
      bgClass: "bg-[#06C755] shadow-[#06C755]/25 hover:shadow-[#06C755]/40",
      iconColor: "text-white",
      icon: <LINEIcon size={20} />,
      track: () => base44.analytics.track({ eventName: "line_click", properties: { location: "floating" } }),
    },
    {
      href: CONTACT_LINKS.linkedin,
      label: t("floatLinkedIn"),
      tooltip: t("floatLinkedIn"),
      bgClass: "bg-[#0A66C2] shadow-[#0A66C2]/25 hover:shadow-[#0A66C2]/40",
      iconColor: "text-white",
      icon: <LinkedInIcon size={18} />,
      track: () => base44.analytics.track({ eventName: "linkedin_click", properties: { location: "floating" } }),
    },
    {
      href: CONTACT_LINKS.github,
      label: t("floatGitHub"),
      tooltip: t("floatGitHub"),
      bgClass: "bg-[#24292e] shadow-black/25 hover:shadow-black/40 border border-white/10",
      iconColor: "text-white",
      icon: <GitHubIcon size={18} />,
      track: () => base44.analytics.track({ eventName: "github_click", properties: { location: "floating" } }),
    },
    {
      href: CONTACT_LINKS.email,
      label: t("floatEmail"),
      tooltip: t("floatEmail"),
      bgClass: "bg-[#EA4335] shadow-[#EA4335]/25 hover:shadow-[#EA4335]/40",
      iconColor: "text-white",
      icon: <GmailIcon size={18} />,
      track: () => base44.analytics.track({ eventName: "email_click", properties: { location: "floating" } }),
    },
  ];

  return (
    <>
      {/* Desktop: vertical stack, always visible */}
      <div className={`hidden md:flex fixed bottom-7 z-50 flex-col gap-2 ${isRTL ? "left-7" : "right-7"}`}>
        {buttons.map((btn) => (
          <FloatBtn key={btn.label} {...btn} isRTL={isRTL} onClick={btn.track}>
            {btn.icon}
          </FloatBtn>
        ))}
      </div>

      {/* Mobile: single toggle button that expands */}
      <div className={`flex md:hidden fixed bottom-5 z-50 flex-col gap-2 ${isRTL ? "left-5 items-start" : "right-5 items-end"}`}>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-2 items-end"
            >
              {buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target={btn.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={btn.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={btn.label}
                  onClick={() => { btn.track(); setMobileOpen(false); }}
                  className={`w-10 h-10 rounded-full ${btn.bgClass} shadow-lg flex items-center justify-center ${btn.iconColor} active:scale-95 transition-all duration-150`}
                >
                  {btn.icon}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close contact menu" : "Open contact menu"}
          className="w-12 h-12 rounded-full bg-[#00b4ff] shadow-lg shadow-[#00b4ff]/30 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}