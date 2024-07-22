import MissionAPI from "$lib/api/mission";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    async function getMissionList() {
        const result = await MissionAPI.missionList('');
        
        return result.data;
    }

    return {
        missionList: await getMissionList()
    };
};