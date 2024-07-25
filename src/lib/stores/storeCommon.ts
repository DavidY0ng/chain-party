import Cookies from 'js-cookie';
import { mediaQuery } from 'svelte-legos';
import { get, writable } from 'svelte/store';
import { storeUserInfo } from './storeUser';
import { zeroAddress } from 'viem';

export const isDesktop = mediaQuery('(min-width: 1280px)');
export const isLgMobile = mediaQuery('(max-width: 426px)')
export const isToken = writable<string | undefined>(undefined);
export const rerender = writable<boolean>(false);

// Subscribe to storeUserInfo changes
storeUserInfo.subscribe((status) => {
	// Update the isToken store whenever storeUserInfo changes
	if (status.web3_address !== zeroAddress) {
		const token = Cookies.get('accessToken');
		isToken.set(token!);
		console.log(get(isToken));
	}
});
