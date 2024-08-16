import { api } from '$lib/http/https';
import type { APIResponse, IPagination } from '$lib/type/commonType';
import type { TDonationLeaderboard } from '$lib/type/donationType';

const DonationAPI = {
	getLeaderboard: async function (data: IPagination): Promise<APIResponse<TDonationLeaderboard>> {
		try {
			const response = await api.get<TDonationLeaderboard>('/dapp/donation/leaderboard', {
				data,
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
