import { base44 } from "@/api/base44Client";

const SESSION_KEY = "analytics_session_id";
const INVITE_KEY = "invite_code";

export function getInviteCode() {
  try {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("invite");
    if (code) {
      localStorage.setItem(INVITE_KEY, code);
      return code;
    }
    return localStorage.getItem(INVITE_KEY) || null;
  } catch {
    return null;
  }
}

export function getSessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        (crypto?.randomUUID?.() ?? "") ||
        Date.now().toString(36) + Math.random().toString(36).slice(2);
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return Date.now().toString(36);
  }
}

export function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua) && !isMobile;
  const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";

  let os = "Unknown";
  if (/Windows/.test(ua)) os = "Windows";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Linux/.test(ua)) os = "Linux";

  return { deviceType, browser, os, userAgent: ua };
}

function getCommonData() {
  const { deviceType, browser, os, userAgent } = getDeviceInfo();
  return {
    inviteCode: getInviteCode() || "direct",
    sessionId: getSessionId(),
    language: document.documentElement.lang || navigator.language || "en",
    referrer: document.referrer || null,
    page: window.location.pathname,
    deviceType,
    browser,
    os,
    userAgent,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    fullUrl: window.location.href,
  };
}

export async function trackVisit() {
  try {
    await base44.functions.invoke("trackEvent", {
      eventType: "visit",
      ...getCommonData(),
    });
  } catch {
    // Tracking must never break the public website
  }
}

export async function trackClick(actionType) {
  try {
    await base44.functions.invoke("trackEvent", {
      eventType: "click",
      actionType,
      ...getCommonData(),
    });
  } catch {
    // Tracking must never break the public website
  }
}