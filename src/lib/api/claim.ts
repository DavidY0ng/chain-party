import { api } from '$lib/http/https';
import type {
	TTotalClaimed,
	TCheckClaim,
	TClaimPayload,
	TRewardBalance
} from '$lib/type/claimType';
import type { APIResponse } from '$lib/type/commonType';

const ClaimAPI = {
	available: {
		claim: async (): Promise<APIResponse<number>> => {
			try {
				const response = await api.get<number>('/dapp/reward/available/claim');
				return response;
			} catch (error) {
				return { success: false, data: {} as number, msg: (error as Error).message };
			}
		}
	},
	claimed: {
		getTotal: async (): Promise<APIResponse<TTotalClaimed>> => {
			try {
				const response = await api.get('/dapp/reward/distribution/balance');
				return response;
			} catch (error) {
				return { success: false, data: {} as TTotalClaimed, msg: (error as Error).message };
			}
		}
	},
	distribution: {
		checkClaim: async (): Promise<APIResponse<TCheckClaim>> => {
			try {
				const response = await api.get('/dapp/reward/distribution/check');
				return response;
			} catch (error) {
				return { success: false, data: {} as TCheckClaim, msg: (error as Error).message };
			}
		},
		claim: async (): Promise<APIResponse<TClaimPayload>> => {
			try {
				const response = await api.get('/dapp/reward/distribution/claim');
				return response;
			} catch (error) {
				return { success: false, data: {} as TClaimPayload, msg: (error as Error).message };
			}
		},
		balance: async (): Promise<APIResponse<TRewardBalance>> => {
			try {
				const response = await api.get('/dapp/reward/distribution/balance');
				return response;
			} catch (error) {
				return { success: false, data: {} as TRewardBalance, msg: (error as Error).message };
			}
		}
	}
};

export default ClaimAPI;
