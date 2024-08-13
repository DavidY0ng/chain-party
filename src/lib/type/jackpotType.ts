import type { Address } from 'viem';

export type TCurrentList = {
	address: Address;
	count: number;
	is_self: boolean;
};

export type TWinnerList = {
	data: {
		address: Address;
		amount: number;
		is_self: boolean;
	}[];
	count: number;
	last_page: number;
};

export type TJackpotPool = {
	amount: number;
	lose_count: number;
};
