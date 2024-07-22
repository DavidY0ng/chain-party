import { api } from '$lib/http/https';
import { storeUserInfo, type TUserInfo } from '$lib/stores/storeUser';

type TWallet = {
	image: string;
	code: string;
	amount: number;
};

const UserAPI = {
	account: {
		getInfo: async function () {
			try {
				const response = await api.get<TUserInfo>('/dapp/user/account/info');

				if (!response.success) return response;

				storeUserInfo.set(response.data);
				
				return response.data;
			} catch (error) {
				return error;
			}
		}
	},
	team: {
		bindUpline: async function (referral: TUserInfo['referral_code']) {
			try {
				const response = await api.post('/dapp/user/team/bind/upline', {
					data: {
						referral
					}
				});

				if (!response.success) return response;

				return response.data;
			} catch (error) {
				return error;
			}
		},
		getDownline: async function (search_user: TUserInfo['web3_address']) {
			try {
				const response = await api.get('/dapp/user/team/downline', {
					data: {
						search_user
					}
				});

				if (!response.success) return response;

				return response.data;
			} catch (error) {
				return error;
			}
		}
	},
	wallet: {
		getList: async function () {
			try {
				const response = await api.get<TWallet[]>('/dapp/user/wallet/list');

				if (!response.success) return response;

				return response.data;
			} catch (error) {
				return error;
			}
		},
		getBalance: async function (wallet: TWallet['code']) {
			try {
				const response = await api.get<TWallet>('/dapp/user/wallet/balance', {
					data: {
						wallet
					}
				});

				if (!response.success) return response;

				return response.data;
			} catch (error) {
				return error;
			}
		}
	}
};

export default UserAPI;
