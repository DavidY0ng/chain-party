import type { APIResponse } from '$lib/commonType';
import { api } from '$lib/http/https';

type TDashboardGame = {
	name: 'lottery';
	image: string;
};

const DashboardAPI = {
	game: {
		getList: async function (): Promise<APIResponse<TDashboardGame[]>> {
			try {
				const response = await api.get<TDashboardGame[]>('/dapp/dashboard/game/list', {
					useToken: false
				});
				return response;
			} catch (error) {
				return { success: false, data: {} as TDashboardGame[], msg: (error as Error).message };
			}
		}
	}
};

export default DashboardAPI;
export type { TDashboardGame };
