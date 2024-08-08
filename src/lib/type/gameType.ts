import type { Address } from 'viem';
import type { IPagination } from './commonType';

export type TGameList = {
	data: {
		date: string;
		round_id: string;
		user_position: string;
		slot: string;
		status: TGameStatus['code'];
	}[];
	count: number;
	last_page: number;
};

export type TGameRound = {
	data: {
		round_id: string;
		date_time_start: number;
		date_time_end: number;
		loser_position: string[];
		status: string;
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

export type TGameStatus = {
	code: 'pending' | 'win' | 'lose' | 'refunded';
};

// ***************** Interface *************

export interface IGetListParams extends IPagination {
	created_at_start: string;
	created_at_end: string;
	status: TGameStatus['code'];
}
