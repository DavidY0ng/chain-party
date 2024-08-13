import { api } from '$lib/http/https';
import type { APIResponse } from '$lib/type/commonType';
import type { TDashboardGame } from '$lib/type/dashboardType';

const DashboardAPI = {
	planet: {
		getReward: async function (): Promise<APIResponse> {
			try {
				const response = await api.get<TDashboardGame[]>('/dapp/dashboard/planet/reward', {
					useToken: false
				});
				return response;
			} catch (error) {
				return { success: false, data: {}, msg: (error as Error).message };
			}
		}
	},
	getList: async function (): Promise<APIResponse<TDashboardGame[]>> {
		try {
			const response = await api.get<TDashboardGame[]>('/dapp/dashboard/game', {
				useToken: false
			});
			return response;
		} catch (error) {
			return { success: false, data: {} as TDashboardGame[], msg: (error as Error).message };
		}
	}
};

export default DashboardAPI;
export type { TDashboardGame };
