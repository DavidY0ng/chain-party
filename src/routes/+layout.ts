import { browser } from '$app/environment';
import { defaultLocale, loadTranslations, locale } from '$lib/i18n';
import { isToken } from '$lib/stores/storeCommon';
import { onChange } from '$lib/web3/wagmi';
import Cookies from 'js-cookie';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	const { pathname } = url;
	const token = Cookies.get('accessToken');
	let targetLocale = defaultLocale;

	onChange();

	if (browser) {
		const getLocal = JSON.parse(localStorage.getItem('storeLocal') || '{}');
		if (getLocal.lang != undefined) targetLocale = getLocal.lang;
	}

	const initLocale = locale.get() || targetLocale;

	await loadTranslations(initLocale, pathname);

	isToken.update(() => {
		return token;
	});

	return {};
};
