import { api } from '$lib/http/https';
import type { APIResponse } from '$lib/type/commonType';
import type { TFuelLevel } from '$lib/type/fuelType';

const FuelApi = {
	getFuelLevel: async function (): Promise<APIResponse<TFuelLevel>> {
		try {
			const response = await api.get<TFuelLevel>('/dapp/reward/distribution/fuel', {
			});
			return response;
		} catch (error) {
			return { success: false, data: {} as TFuelLevel, msg: (error as Error).message };
		}
	},
};

export default FuelApi;