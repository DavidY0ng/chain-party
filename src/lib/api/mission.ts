import { type Address } from 'viem';
import { api } from '../http/https';
import Cookies from 'js-cookie';
import { signMessage } from '@wagmi/core';
import { wagmiConfig } from '../web3/client';
import { goto } from '$app/navigation';

const MissionAPI = {
	missionList: async function (type?:string) {
		try {
			const response = await api.get('/dapp/mission/list', {
                data: {
                    size: 20,
                    page: 1,
                    type: type
                },
                useToken: true
			});

			if (!response.success) return response;

            if (response.success) {
                return response.data;
            }

		} catch (error) {

			console.error('Error fetching message:', error);
			return error;
		}
	},
	takeMission: async function (name: string,) {
		try {
			const response = await api.post('/dapp/mission/take', {
				data: {
					name
				},
			});

			if (!response.success) return response;

            if (response.success) {
                return response.data;
            }

		} catch (error) {
			console.error('Error posting message:', error);
			return error;
		}
	},
    claimMission: async function (sn: string,) {
		try {
			const response = await api.post('/dapp/mission/claim', {
				data: {
					sn
				},
			});

            if (!response.success) return response;

            if (response.success) {
                return response.data;
            }

		} catch (error) {
			console.error('Error posting message:', error);
			return error;
		}
	},
};

export default MissionAPI;
