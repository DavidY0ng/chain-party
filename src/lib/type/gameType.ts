import type { Address } from 'viem';
import type { IPagination } from './commonType';

export type TGameList = {
	data: {
		date: string;
		round_id: string;
		user_position: string;
		slot: string;
		status: TGameHistoryStatus['code'];
	}[];
	count: number;
	last_page: number;
};

type CurrentStatus = 'awaiting' | 'game_start' | 'calculating_reward';

type PastStatus = 'game_end' | 'game_canceled';

export type TGameRound = {
	data: {
		round_id: number;
		date_time_start: number;
		date_time_end: number;
		loser_position: string[];
		status: CurrentStatus | PastStatus;
		type: 'current' | 'past' | 'upcoming';
		slot: number;
	}[];
	count: number;
	last_page: number;
};

export type TGameSlot = {
	data: {
		address: Address;
		user_position: number;
		slot: number;
		status: string;
		is_self: boolean;
	}[];
	count: number;
	last_slot: number;
	self_position: string;
};

export type TGameHistoryStatus = {
	code: 'pending' | 'win' | 'lose' | 'refunded';
};

// ***************** Interface *************

export interface IGetListParams extends IPagination {
	created_at_start: string;
	created_at_end: string;
	status: TGameHistoryStatus['code'];
}
