import type { APIResponse } from '$lib/commonType';
import { api } from '$lib/http/https';

type TDonationLeaderboard = {
	data: {
		rank: number;
		address: string;
		amount: string;
		is_self: boolean;
	}[];
	count: number;
};

const DonationAPI = {
	getLeaderboard: async function (size: number): Promise<APIResponse<TDonationLeaderboard>> {
		try {
			const response = await api.get<TDonationLeaderboard>('/dapp/donation/leaderboard', {
				data: {
					size
				}
			});
			return response;
		} catch (error) {
			return { success: false, data: {} as TDonationLeaderboard, msg: (error as Error).message };
		}
	}
};

export default DonationAPI;
export type { TDonationLeaderboard };
