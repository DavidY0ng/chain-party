import { api } from '$lib/http/https';
import type { APIResponse } from '$lib/type/commonType';
import type {
	IGetTransactionListParam,
	TTransaction,
	TTransactionType
} from '$lib/type/transactionType';

const TransactionAPI = {
	history: {
		getList: async function (data: IGetTransactionListParam): Promise<APIResponse<TTransaction>> {
			try {
				const response = await api.get<TTransaction>('/dapp/transaction/history/list', {
					data
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
