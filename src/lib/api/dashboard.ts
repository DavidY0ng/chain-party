import { api } from '$lib/http/https';
import type { APIResponse } from '$lib/type/commonType';
import type { TDashboardPool } from '$lib/type/dashboardType';

const DashboardAPI = {
	planet: {
		getReward: async function (): Promise<APIResponse> {
			try {
				const response = await api.get<TDashboardPool>('/dapp/dashboard/planet/reward', {
					useToken: false
				});
				return response;
			} catch (error) {
				return { success: false, data: {} as TDashboardPool, msg: (error as Error).message };
			}
		}
	}
};

export default DashboardAPI;
