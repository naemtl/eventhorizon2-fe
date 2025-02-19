import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { enLang } from './locales/en/en.ts';
import { esLang } from './locales/es/es.ts';
import { frLang } from './locales/fr/fr.ts';

const resources = {
  en: {
    translation: enLang,
  },
  fr: {
    translation: frLang,
  },
  es: {
    translation: esLang,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['en', 'es', 'fr'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
