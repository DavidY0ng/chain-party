import type { APIResponse } from '$lib/commonType';
import { api } from '$lib/http/https';

type TTransaction = {
	count: number;
	data: {
		amount: string;
		date: string;
		sn: string;
		type: string;
	}[];
	last_page: number;
};

type TTransactionType = {
	code: string;
};

const TransactionAPI = {
	history: {
		getList: async function (
			created_at_start: string,
			created_at_end: string,
			type: TTransactionType['code'],
			size: number = 10,
			page: number = 0
		): Promise<APIResponse<TTransaction>> {
			page++;
			try {
				const response = await api.get<TTransaction>('/dapp/transaction/history/list', {
					data: {
						size,
						page,
						created_at_start,
						created_at_end,
						type
					}
				});
				return response;
			} catch (error) {
				return { success: false, data: {} as TTransaction, msg: (error as Error).message };
			}
		}
	},
	getTypes: async function (): Promise<APIResponse<TTransactionType[]>> {
		try {
			const response = await api.get<TTransactionType[]>('/dapp/transaction/type');
			return response;
		} catch (error) {
			return { success: false, data: {} as TTransactionType[], msg: (error as Error).message };
		}
	}
};

export default TransactionAPI;
export type { TTransaction, TTransactionType };
