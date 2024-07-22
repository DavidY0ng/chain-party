import { browser } from '$app/environment';
import UserAPI from '$lib/api/user';
import { defaultLocale, loadTranslations, locale } from '$lib/i18n';
import Cookies from 'js-cookie';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	const { pathname } = url;
	let targetLocale = defaultLocale;
	const token = Cookies.get('accessToken');

	if (browser) {
		const getLocal = JSON.parse(localStorage.getItem('storeLocal') || '{}');
		if (getLocal.lang != undefined) targetLocale = getLocal.lang;
	}

	const initLocale = locale.get() || targetLocale;

	await loadTranslations(initLocale, pathname);

	if (token) {
		await UserAPI.account.getInfo();
	}

	return {};
};
