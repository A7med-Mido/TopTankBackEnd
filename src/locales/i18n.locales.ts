import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import { en } from "./en/translation";
import { ar } from "./ar/translation";

export const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

export type TranslationKeys = keyof typeof en;


i18n
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    preload: ["en", "ar"],
    interpolation: { escapeValue: false },
  });

export default i18n;
