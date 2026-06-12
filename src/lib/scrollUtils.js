/**
 * Shared scroll utility — used by Header, Hero, Footer, CTA buttons.
 * Accounts for sticky navbar height (72px).
 */

export const NAV_HEIGHT = 72;

export function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}