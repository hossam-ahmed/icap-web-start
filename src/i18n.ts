import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

/**
 * Supported languages. Translation files live in
 * `public/locales/<code>/translation.json` and are fetched on demand.
 */
export const LANGUAGES = {
	en: { label: 'English', dir: 'ltr' },
	ar: { label: 'العربية', dir: 'rtl' }
} as const;

export type Language = keyof typeof LANGUAGES;
export const DEFAULT_LANGUAGE: Language = 'en';

/** Keep `<html lang dir>` in sync so RTL layout and Tailwind `rtl:` variants work. */
const applyDocumentLanguage = (lng: string) => {
	document.documentElement.lang = lng;
	document.documentElement.dir = i18n.dir(lng);
};

i18n.on('languageChanged', applyDocumentLanguage);

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next) // bind react-i18next to the instance
	.init({
		fallbackLng  : DEFAULT_LANGUAGE,
		supportedLngs: Object.keys(LANGUAGES),
		load         : 'languageOnly', // "en-US" -> "en"
		debug        : import.meta.env.DEV,

		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json'
		},

		detection: {
			// URL (?lang=ar) > saved choice > browser language
			order             : ['querystring', 'localStorage', 'navigator', 'htmlTag'],
			lookupQuerystring : 'lang',
			lookupLocalStorage: 'icap-lang',
			caches            : ['localStorage']
		},

		interpolation: {
			escapeValue: false // React already escapes rendered values
		}
	});

export default i18n;
