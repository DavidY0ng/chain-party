import { api } from '$lib/http/https';
import type { APIResponse } from '$lib/type/commonType';
import type { TDonationLeaderboard } from '$lib/type/donationType';

const DonationAPI = {
	getLeaderboard: async function (size: number): Promise<APIResponse<TDonationLeaderboard>> {
		try {
			const response = await api.get<TDonationLeaderboard>('/dapp/donation/leaderboard', {
				data: {
					size
				},
				useToken: false
			});
			return response;
		} catch (error) {
			return { success: false, data: {} as TDonationLeaderboard, msg: (error as Error).message };
		}
	}
};

export default DonationAPI;
export type { TDonationLeaderboard };
