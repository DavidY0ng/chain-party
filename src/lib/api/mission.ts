import type { APIResponse } from '$lib/type/commonType';
import type { TMission } from '$lib/type/missionType';
import { api } from '../http/https';

const MissionAPI = {
	missionList: async function (type: TMission['type'] = ''): Promise<APIResponse> {
		try {
			const response = await api.get<TMission[]>('/dapp/mission/list', {
				data: {
					size: 20,
					page: 1,
					type
				},
				useToken: true
			});

			return response;
		} catch (error) {
			console.error(error);
			return { success: false, data: {} as TMission, msg: (error as Error).message };
		}
	},
	takeMission: async function (name: TMission['name']): Promise<APIResponse> {
		try {
			const response = await api.post('/dapp/mission/take', {
				data: {
					name
				}
			});

			return response;
		} catch (error) {
			console.error('Error posting message:', error);
			return { success: false, data: {} as TMission, msg: (error as Error).message };
		}
	},
	claimMission: async function (sn: TMission['sn']): Promise<APIResponse> {
		try {
			const response = await api.post('/dapp/mission/claim', {
				data: {
					sn
				}
			});

			return response;
		} catch (error) {
			console.error('Error posting message:', error);
			return { success: false, data: {} as TMission, msg: (error as Error).message };
		}
	}
};

export default MissionAPI;
export type { TMission };
