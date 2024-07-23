import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { emptyUserInfo, storeUserInfo } from '$lib/stores/storeUser';
import {
	connect,
	getAccount,
	getChainId,
	injected,
	watchAccount,
	watchChainId,
	type GetAccountReturnType,
	type GetChainIdReturnType
} from '@wagmi/core';
import Cookies from 'js-cookie';
import { toast } from 'svelte-sonner';
import { get, readable } from 'svelte/store';
import { wagmiConfig } from './client';

export const chainId = readable<GetChainIdReturnType>(getChainId(wagmiConfig), (set) =>
	watchChainId(wagmiConfig, { onChange: set })
);

export const account = readable(getAccount(wagmiConfig), (set) => {
	watchAccount(wagmiConfig, {
		onChange: async (data) => {
			set(data);
		}
	});
});

export const provider = readable<unknown | undefined>(undefined, (set) =>
	watchAccount(wagmiConfig, {
		onChange: async (account: GetAccountReturnType) => {
			if (!account.connector) return set(undefined);
			set(await account.connector?.getProvider());
		}
	})
);

export async function connectWallet() {
	await connect(wagmiConfig, { connector: injected() });
}

export const onChange = async () => {
	// To compare address in native mobile apps
	// Tp wallet cant detect wallet change, so use this method

	if (browser && get(account).address !== get(storeUserInfo).web3_address) {
		window.ethereum.on('accountsChanged', async () => {
			onDisconnect();
			goto('/');
			toast.warning('Account Changed... Please Login Again');
		});
	}
};

export const onDisconnect = async () => {
	storeUserInfo.set(emptyUserInfo);
	Cookies.remove('accessToken');
};
