import MissionAPI from "$lib/api/mission";
import type { PageLoad } from "./$types";
import type { TMission } from '$lib/api/mission'
import type { APIResponse } from "$lib/http/https";


export const load: PageLoad = async () => {
    async function getMissionList() {
        const result = await MissionAPI.missionList() as APIResponse<TMission[]>;
        if (result.success) {
            return result.data;
        }
        
    }

    return {
        missionList: await getMissionList()
    };
};