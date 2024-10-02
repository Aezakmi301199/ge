import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { environments } from '../environment';
import translationRU from '../locales/ru/translation.json';
import { AppEnv } from '../shared/enums/app-env.enum';

export const supportedLngs = {
  en: 'English',
  ru: 'Russian (Русский)',
};

const resources = {
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: Object.keys(supportedLngs),
    debug: environments.VITE_APP_ENV === AppEnv.DEV,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
