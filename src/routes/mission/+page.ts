import MissionAPI from "$lib/api/mission";
import type { PageLoad } from "./$types";
import type { TMission } from '$lib/api/mission'
import type { APIResponse } from "$lib/http/https";
import Cookies from 'js-cookie';


export const load: PageLoad = async () => {
    const token = Cookies.get('accessToken')
    async function getMissionList() {
        if (token) {
            const result = await MissionAPI.missionList() as APIResponse<TMission[]>;
            if (result) {
                return result.data;
            }
        }
    }

    return {
        missionList: await getMissionList()
    };
};