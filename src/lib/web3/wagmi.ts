import { browser } from '$app/environment';
import AuthAPI from '$lib/api/auth';
import { emptyUserInfo, storeUserInfo } from '$lib/stores/storeUser';
import { getUserProfile } from '$lib/utils';
import {
	disconnect,
	getAccount,
	getChainId,
	watchAccount,
	watchChainId,
	type GetAccountReturnType,
	type GetChainIdReturnType
} from '@wagmi/core';
import Cookies from 'js-cookie';
import { toast } from 'svelte-sonner';
import { get, readable } from 'svelte/store';
import { zeroAddress, type Address } from 'viem';
import { wagmiConfig, web3Modal } from './client';

export const chainId = readable<GetChainIdReturnType>(getChainId(wagmiConfig), (set) =>
	watchChainId(wagmiConfig, { onChange: set })
);

let hasRequestedMessage = false; // Flag to track if requestMessage has been called

export const account = readable(getAccount(wagmiConfig), (set) => {
	watchAccount(wagmiConfig, {
		onChange: async (data) => {
			set(data);
			if (
				data.address !== undefined &&
				get(storeUserInfo).web3_address === zeroAddress &&
				!hasRequestedMessage
			) {
				hasRequestedMessage = true; // Set flag to true to prevent further calls
				await requestMessage(data.address); // Execute your async function
			}
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
	web3Modal.open();
}

export async function requestMessage(address: Address) {
	const auth = await AuthAPI.requestMessage(address as Address);
	console.log(auth);
	if (auth) {
		await getUserProfile();
		toast.success('Your wallet has been connected');
	} else {
		toast.error('Failed to login');
	}
}

export const onChange = async () => {
	// To compare address in native mobile apps
	// Tp wallet cant detect wallet change, so use this method

	if (browser && get(account).address !== get(storeUserInfo).web3_address) {
		window.ethereum.on('accountsChanged', async () => {
			hasRequestedMessage = false;
			onDisconnect();

			if (
				get(storeUserInfo).web3_address !== get(account).address &&
				get(storeUserInfo).web3_address !== zeroAddress
			) {
				toast.warning('Account Changed... Please Login Again');
			}
		});
	}
};

export const onDisconnect = async () => {
	hasRequestedMessage = false;
	await disconnect(wagmiConfig);
	storeUserInfo.set(emptyUserInfo);
	Cookies.remove('accessToken');
};
