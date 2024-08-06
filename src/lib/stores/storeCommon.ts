import Cookies from 'js-cookie';
import { mediaQuery } from 'svelte-legos';
import { writable } from 'svelte/store';
import { zeroAddress } from 'viem';
import { storeUserInfo } from './storeUser';

export const isDesktop = mediaQuery('(min-width: 1280px)');
export const isToken = writable<string | undefined>(undefined);
export const rerender = writable<boolean>(false);
export const isComingSoon = writable<boolean>(false);

export const showBindReferral = writable<boolean>(false);

// Subscribe to storeUserInfo changes
storeUserInfo.subscribe((status) => {
	// Update the isToken store whenever storeUserInfo changes
	if (status.web3_address !== zeroAddress) {
		const token = Cookies.get('accessToken');
		isToken.update(() => {
			return token;
		});
	}
});
