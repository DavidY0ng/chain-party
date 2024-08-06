import { api } from '$lib/http/https';
import { type TUserInfo } from '$lib/stores/storeUser';
import type { APIResponse } from '$lib/type/commonType';
import type { TDownline, TWallet } from '$lib/type/userType';

const UserAPI = {
	account: {
		getInfo: async function (): Promise<APIResponse<TUserInfo>> {
			try {
				const response = await api.get<TUserInfo>('/dapp/user/account/info');

				return response;
			} catch (error) {
				return { success: false, data: {} as TUserInfo, msg: (error as Error).message };
			}
		}
	},
	team: {
		bindUpline: async function (referral: TUserInfo['referral_code']): Promise<APIResponse> {
			try {
				const response = await api.post('/dapp/user/team/bind/upline', {
					data: {
						referral
					}
				});

				return response;
			} catch (error) {
				return { success: false, data: {} as TUserInfo, msg: (error as Error).message };
			}
		},
		getDownline: async function (
			search_user: TUserInfo['web3_address']
		): Promise<APIResponse<TDownline[]>> {
			try {
				const response = await api.get<TDownline[]>('/dapp/user/team/downline', {
					data: {
						search_user
					}
				});

				return response;
			} catch (error) {
				return { success: false, data: {} as TDownline[], msg: (error as Error).message };
			}
		}
	},
	wallet: {
		getList: async function (): Promise<APIResponse> {
			try {
				const response = await api.get<TWallet[]>('/dapp/user/wallet/list');

				return response;
			} catch (error) {
				return { success: false, data: {} as TUserInfo, msg: (error as Error).message };
			}
		},
		getBalance: async function (wallet: TWallet['code']): Promise<APIResponse> {
			try {
				const response = await api.get<TWallet>('/dapp/user/wallet/balance', {
					data: {
						wallet
					}
				});

				return response;
			} catch (error) {
				return { success: false, data: {} as TUserInfo, msg: (error as Error).message };
			}
		}
	}
};

export default UserAPI;
export type { TDownline, TWallet };
