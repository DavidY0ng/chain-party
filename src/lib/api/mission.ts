import { api, type APIResponse } from '../http/https';

type TMission = {
	sn: string,
	name: string,
	description: string,
	reward: [
		{
			wallet: string,
			amount: string
		}
	],
	action: string,
	type: "daily" | "weekly" | "permanent" | "",
	status: string,
	progress: number,
	current: number,
	requirement: number,
	auto_take: number
}

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
			console.error(error)
			return { success: false, data: {} as TMission, msg: (error as Error).message };
		}
	},
	takeMission: async function (name: TMission['name']): Promise<APIResponse> {
		try {
			const response = await api.post('/dapp/mission/take', {
				data: {
					name
				},
			});

			return response

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
				},
			});

			return response

		} catch (error) {
			console.error('Error posting message:', error);
			return { success: false, data: {} as TMission, msg: (error as Error).message };
		}
	},
};

export default MissionAPI;
export type { TMission }