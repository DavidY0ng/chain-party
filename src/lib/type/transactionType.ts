import type { IPagination } from './commonType';

export type TTransaction = {
	count: number;
	data: {
		amount: string;
		date: string;
		sn: string;
		type: string;
	}[];
	last_page: number;
};

export type TTransactionType = {
	code: string;
};

export interface IGetTransactionListParam extends IPagination {
	created_at_start: string;
	created_at_end: string;
	type: TTransactionType['code'];
}
