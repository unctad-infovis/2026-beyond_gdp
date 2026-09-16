// Runtime language resolution, ported from 2026-gstp's i18n.js. Priority order: an explicit
// ?lang= query param, a lang attribute on the embed root <div>, an /fr/ or /es/ segment in the
// page URL (how unctad.org serves translated pages), then English as the default.
export const SUPPORTED_LANGUAGES = ['en', 'fr', 'es'];
export const DEFAULT_LANGUAGE = 'en';

export function resolveLanguage(container) {
  const queryLang = new URLSearchParams(window.location.search).get('lang');
  if (SUPPORTED_LANGUAGES.includes(queryLang)) return queryLang;

  const attrLang = container?.getAttribute('lang');
  if (SUPPORTED_LANGUAGES.includes(attrLang)) return attrLang;

  const pathLang = window.location.pathname.split('/').find(segment => SUPPORTED_LANGUAGES.includes(segment));
  if (pathLang) return pathLang;

  return DEFAULT_LANGUAGE;
}

const LOCALES = { en: 'en-US', es: 'es-ES', fr: 'fr-FR' };

export function getLocale(lang) {
  return LOCALES[lang] ?? LOCALES[DEFAULT_LANGUAGE];
}
