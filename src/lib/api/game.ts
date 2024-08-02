import { api, type APIResponse } from '$lib/http/https';
import type { Address } from 'viem';
import type { TDashboardGame } from './dashboard';

type TGameList = {
	date: string;
	round_id: string;
	user_position: string;
	slot: string;
	status: string;
};

type TGameRound = {
	count: number;
	data: [
		{
			round_id: string;
			date_time_start: string;
			date_time_end: string;
			winner_position: number[];
			status: string;
			slot: number;
		}
	];
	last_page: number;
};

type TGameSlot = {
	address: Address;
	user_position: number;
	slot: number;
	status: string;
	is_self: boolean;
};

type TGameStatus = {
	code: 'pending' | 'win' | 'lose' | 'refunded';
};

// ***************** Interface *************

interface IGetListParams {
	size: number;
	page: number;
	created_at_start: string;
	created_at_end: string;
	status: TGameStatus;
}

const GameAPI = {
	history: {
		getList: async function (params: IGetListParams): Promise<APIResponse<TGameList[]>> {
			try {
				const response = await api.get<TGameList[]>('/dapp/game/history/list', {
					data: {
						...params
					}
				});
				return response;
			} catch (error) {
				return { success: false, data: {} as TGameList[], msg: (error as Error).message };
			}
		}
	},
	getRound: async function (
		page: number,
		game_name: TDashboardGame['name']
	): Promise<APIResponse<TGameRound>> {
		try {
			const response = await api.get<TGameRound>('/dapp/game/round', {
				data: {
					page,
					game_name
				}
			});

			return response;
		} catch (error) {
			return { success: false, data: {} as TGameRound, msg: (error as Error).message };
		}
	},
	getSlot: async function (
		game_name: TDashboardGame['name'],
		slot: number,
		round_id: string
	): Promise<APIResponse<TGameSlot[]>> {
		try {
			const response = await api.get<TGameSlot[]>('/dapp/game/slot', {
				data: {
					game_name,
					slot,
					round_id
				}
			});

			return response;
		} catch (error) {
			return { success: false, data: {} as TGameSlot[], msg: (error as Error).message };
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
export type { TGameList, TGameRound, TGameStatus, TGameSlot, IGetListParams };
