import { browser } from '$app/environment';
import { defaultLocale, loadTranslations, locale } from '$lib/i18n';
import { isToken, showBindReferral } from '$lib/stores/storeCommon';
import { storeUserInfo } from '$lib/stores/storeUser';
import { onChange, onDisconnect } from '$lib/web3/wagmi';
import Cookies from 'js-cookie';
import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';
import { zeroAddress } from 'viem';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	const { pathname } = url;
	const token = Cookies.get('accessToken');
	let targetLocale = defaultLocale;
	let referralCode: string | null = null;

	onChange();

	if (browser) {
		const getLocal = JSON.parse(localStorage.getItem('storeLocal') || '{}');
		if (getLocal.lang != undefined) targetLocale = getLocal.lang;
		const initLocale = locale.get() || targetLocale;

		await loadTranslations(initLocale, pathname);
	}

	isToken.update(() => {
		return token;
	});

	if (token === undefined && get(storeUserInfo).web3_address !== zeroAddress) {
		onDisconnect();
		toast.warning('Session Expired... Please Login Again');
	}

	// check referral code
	if (browser) {
		referralCode = url.searchParams.get('referralCode');
		if (referralCode !== null) {
			showBindReferral.set(true);
		}
	}
};
