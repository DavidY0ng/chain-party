import type { Address } from 'viem';

export type TCurrentList = {
	address: Address;
	count: number;
	is_self: boolean;
};

export type TWinnerList = {
	address: Address;
};
