import { api } from '$lib/http/https';
import type { APIResponse, IPagination } from '$lib/type/commonType';
import type { TCurrentList, TJackpotPool, TWinnerList } from '$lib/type/jackpotType';

const JackpotAPI = {
	getCurrentList: async function (data: IPagination): Promise<APIResponse<TCurrentList>> {
		try {
			const response = await api.get<TCurrentList>('/dapp/jackpot/current', {
				data
			});
			return response;
		} catch (error) {
			return { success: false, data: {} as TCurrentList, msg: (error as Error).message };
		}
	},
	getWinnerList: async function (data: IPagination): Promise<APIResponse<TWinnerList>> {
		try {
			const response = await api.get<TWinnerList>('/dapp/jackpot/winner', {
				data,
				useToken: false
			});
			return response;
		} catch (error) {
			return { success: false, data: {} as TWinnerList, msg: (error as Error).message };
		}
	},
	getPool: async function () {
		try {
			const response = await api.get<TJackpotPool>('/dapp/jackpot/pool');
			return response;
		} catch (error) {
			return { success: false, data: {} as TJackpotPool, msg: (error as Error).message };
		}
	}
};

export default JackpotAPI;
