import { signMessage } from '@wagmi/core';
import Cookies from 'js-cookie';
import { type Address } from 'viem';
import { api } from '../http/https';
import { wagmiConfig } from '../web3/client';

const AuthAPI = {
	requestMessage: async function (address: Address) {
		try {
			const response = await api.post('/dapp/auth/request', {
				data: { address },
				useToken: false
			});

			if (!response.data) throw new Error('No Message Received');

			const signature = await signMessage(wagmiConfig, {
				message: { raw: response.data }
			});

			if (signature) {
				const verified = await this.verifyMessage(signature, address);
				return verified;
			}
		} catch (error) {
			console.error('Error requesting message:', error);
			return error;
		}
	},
	verifyMessage: async function (signature: string, address: Address) {
		try {
			const response = await api.post('/dapp/auth/verify', {
				data: {
					address,
					sign: signature
				},
				useToken: false
			});

			if (!response.data.access_token) {
				throw new Error('No Token Received');
			}

			Cookies.set('accessToken', response.data.access_token, {
				expires: response.data.expires_in
			});
			return true;
		} catch (error) {
			console.error('Error validating message:', error);
			return false;
		}
	},
	logout: async function () {
		const cookie = Cookies.get('accessToken');

		if (!cookie) return Cookies.remove('accessToken');

		await api.post('/dapp/auth/logout');
		Cookies.remove('accessToken');
	}
};

export default AuthAPI;
