import i18n from 'sveltekit-i18n';
import lang from '$lib/i18n/lang.json';
import en from './en';
import zh from './zh'

/** @type {import('sveltekit-i18n').Config} */
const config = {
	fallbackLocale: 'en',
	translations: {
		en: { lang },
		zh: { lang }
	},
	loaders: [...en, ...zh]
};

export const defaultLocale = 'en';
export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
