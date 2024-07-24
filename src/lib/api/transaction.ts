import { api, type APIResponse } from '$lib/http/https';

export type TTransaction = {
	date: string;
	sn: string;
	type: string;
	status: string;
	amount: number;
	wallet: string;
};

export type TTransactionType = {
	id: number;
	code: string;
};

const TransactionAPI = {
	history: {
		getList: async function (
			size: number,
			page: number,
			wallet: string
		): Promise<APIResponse<TTransaction[]>> {
			try {
				const response = await api.get<TTransaction[]>('dapp/transaction/history/list', {
					data: {
						size,
						page,
						wallet
					}
				});
				return response;
			} catch (error) {
				return { success: false, data: {} as TTransaction[], msg: (error as Error).message };
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
