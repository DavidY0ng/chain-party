<script lang="ts">
	import { isToken } from '$lib/stores/storeCommon';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
    import TotalReward from '$lib/components/page/fuel/TotalReward.svelte';
	import Rocket from '$lib/components/page/fuel/Rocket.svelte';
	import FuelApi from '$lib/api/fuel';
	import type { TFuelLevel } from '$lib/type/fuelType';

	let fuelData: TFuelLevel = { data: [], total: 0 };;
	async function getFuelLevel() {
		const result = await FuelApi.getFuelLevel();

		if (result.success) {
			fuelData = {
				data: result.data.data, 
				total: result.data.total
			}; 
		}
	}

	storeUserInfo.subscribe((value) => {
		if (value.web3_address !== zeroAddress) {
			getFuelLevel();
		}
	});

	onMount(() => {
		if ($isToken === undefined) return;
		getFuelLevel()
	});
</script>
<div class="fixed inset-0 z-[-1] ">
	<img src='/img/fuel/bg.png' alt='bg-img' class="w-full h-full object-cover">
  </div>

<div in:fade class="relative h-full marker:w-full px-4 xl:px-0">
	
	<div class="relative m-auto w-full max-w-[1400px] space-y-20 pt-[20px] md:pt-[40px] flex flex-col md:flex-row md:justify-between">
		<Rocket {fuelData}/>
		<TotalReward {fuelData} />
	</div>
</div>
