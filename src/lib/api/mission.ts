import { type Address } from 'viem';
import { api, type APIResponse } from '../http/https';
import Cookies from 'js-cookie';
import { signMessage } from '@wagmi/core';
import { wagmiConfig } from '../web3/client';
import { goto } from '$app/navigation';

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
	missionList: async function (type: TMission['type'] = '') {
		try {

			const data: any = {
				size: 20,
				page: 1,
				type
			};

			const response = await api.get<TMission[]>('/dapp/mission/list', {
				data: data,
				useToken: true
			});


			return response.data;

		} catch (error) {
			console.error(error)
			return error
		}
	},
	takeMission: async function (name: TMission['name']) {
		try {
			const response = await api.post('/dapp/mission/take', {
				data: {
					name
				},
			});

			return response

		} catch (error) {
			console.error('Error posting message:', error);
			return error;
		}
	},
	claimMission: async function (sn: TMission['sn']) {
		try {
			const response = await api.post('/dapp/mission/claim', {
				data: {
					sn
				},
			});

			if (!response.success) return response;

			if (response.success) {
				return response
			}

		} catch (error) {
			console.error('Error posting message:', error);
			return error;
		}
	},
};

export default MissionAPI;
export type { TMission }