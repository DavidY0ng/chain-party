import MissionAPI from "$lib/api/mission";
// import 

export async function load () {
    async function getMissionList() {
        const result = await MissionAPI.missionList();

        // writing your js here if u want to manipulate the data coming from api

        // end

        return result;
    }

    return {
        missionList: await getMissionList()
    };
}