import { api, type APIResponse } from '$lib/http/https';
import type { Address } from 'viem';

type TGameList = {
	date: string;
	round_id: string;
	user_position: string;
	slot: string;
	status: string;
};

type TGameRound = {
	round_id: string;
	date_time_start: string;
	date_time_end: string;
	winner_slot: number[];
	status: string;
	slot: number;
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

const GameAPI = {
	history: {
		getList: async function (page: number, game_name: string): Promise<APIResponse<TGameList[]>> {
			try {
				const response = await api.get<TGameList[]>('/dapp/game/round', {
					data: {
						page,
						game_name
					}
				});
				return response;
			} catch (error) {
				return { success: false, data: {} as TGameList[], msg: (error as Error).message };
			}
		}
	},
	getRound: async function (page: number, game_name: string): Promise<APIResponse<TGameRound[]>> {
		try {
			const response = await api.get<TGameRound[]>('/dapp/game/round', {
				data: {
					page,
					game_name
				}
			});

			return response;
		} catch (error) {
			return { success: false, data: {} as TGameRound[], msg: (error as Error).message };
		}
	},
	getSlot: async function (
		game_name: string,
		slot: number,
		round_id: number
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
export type { TGameList };
