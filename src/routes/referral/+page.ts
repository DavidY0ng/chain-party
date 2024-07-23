import UserAPI from '$lib/api/user';
import { storeUserInfo } from '$lib/stores/storeUser';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import Cookies from 'js-cookie';

export const load: PageLoad = async () => {
	const token = Cookies.get('accessToken');

	async function getDownline() {
		if (token) {
			const response = await UserAPI.team.getDownline(get(storeUserInfo).web3_address);

			const treeData = {
				web3_address: get(storeUserInfo).web3_address,
				downline_count: response.length,
				children: []
			};
			console.log(response)

			return treeData;
		} else {
			return [];
		}
	}

	return {
		downlineList: await getDownline()
	};
};
