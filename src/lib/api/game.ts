import { api } from '$lib/http/https';
import { storeUserInfo } from '$lib/stores/storeUser';
import type { APIResponse } from '$lib/type/commonType';
import type {
	IGetListParams,
	TGameList,
	TGameRound,
	TGameSlot,
	TGameStatus
} from '$lib/type/gameType';
import { get } from 'svelte/store';
import { zeroAddress } from 'viem';

const GameAPI = {
	history: {
		getList: async function (data: IGetListParams): Promise<APIResponse<TGameList>> {
			try {
				const response = await api.get<TGameList>('/dapp/game/history/list', {
					data
				});
				return response;
			} catch (error) {
				return { success: false, data: {} as TGameList, msg: (error as Error).message };
			}
		}
	},
	getRound: async function (page: number, size: number): Promise<APIResponse<TGameRound>> {
		try {
			const response = await api.get<TGameRound>('/dapp/game/round', {
				data: {
					page,
					size
				},
				useToken: get(storeUserInfo).web3_address === zeroAddress ? false : true
			});

			return response;
		} catch (error) {
			return { success: false, data: {} as TGameRound, msg: (error as Error).message };
		}
	},
	getSlot: async function (slot: number, round_id: number): Promise<APIResponse<TGameSlot>> {
		try {
			const response = await api.get<TGameSlot>('/dapp/game/slot', {
				data: {
					slot,
					round_id
				}
			});

			return response;
		} catch (error) {
			return { success: false, data: {} as TGameSlot, msg: (error as Error).message };
		}
	},
	getStatus: async function (): Promise<APIResponse<TGameStatus[]>> {
		try {
			const response = await api.get<TGameStatus[]>('/dapp/game/status');
			return response;
		} catch (error) {
			return { success: false, data: {} as TGameStatus[], msg: (error as Error).message };
		}
	}
};

export default GameAPI;
export type { IGetListParams, TGameList, TGameRound, TGameSlot, TGameStatus };
