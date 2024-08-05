import type { APIResponse, IPagination } from '$lib/commonType';
import { api } from '$lib/http/https';
import type { Address } from 'viem';

type TCurrentList = {
	address: Address;
	count: number;
	is_self: boolean;
};

type TWinnerList = {
	address: Address;
};

const JackpotAPI = {
	getCurrentList: async function (data: IPagination): Promise<APIResponse<TCurrentList[]>> {
		try {
			const response = await api.get<TCurrentList[]>('/dapp/jackpot/current', {
				data
			});
			return response;
		} catch (error) {
			return { success: false, data: {} as TCurrentList[], msg: (error as Error).message };
		}
	},
	getWinnerList: async function (data: IPagination): Promise<APIResponse<TWinnerList[]>> {
		try {
			const response = await api.get<TWinnerList[]>('/dapp/jackpot/winner', {
				data
			});
			return response;
		} catch (error) {
			return { success: false, data: {} as TWinnerList[], msg: (error as Error).message };
		}
	}
};

export default JackpotAPI;
