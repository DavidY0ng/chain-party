import { api } from '$lib/http/https';
import type { APIResponse, IPagination } from '$lib/type/commonType';
import type { TStakeList } from '$lib/type/stakeType';

const StakeAPI = {
	history: {
		getList: async (data: IPagination): Promise<APIResponse<TStakeList>> => {
			try {
				const response = await api.get<TStakeList>('/dapp/stake/history/list', {
					data
				});

				return response;
			} catch (error) {
				return { success: false, data: {} as TStakeList, msg: (error as Error).message };
			}
		}
	}
};

export default StakeAPI;
