import { api, type APIResponse } from '$lib/http/https';

type TTransaction = {
	date: string;
	sn: string;
	type: string;
	status: string;
	amount: number;
	wallet: string;
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
	}
};

export default TransactionAPI;
