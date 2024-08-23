<script lang="ts">
	import FuelApi from '$lib/api/fuel';
	import { onMount } from 'svelte';
	import type { TFuelLevel } from '$lib/type/fuelType';
	import { Text } from '$lib/components/ui/text';

	const levelState = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
	let fuelData: TFuelLevel = [];

	async function getFuelLevel() {
		const result = await FuelApi.getFuelLevel();

		if (result.success) {
			fuelData = result.data; // Assuming result.data is an array of levels and amounts
		}
	}

	function determineRocketState(fuelData: TFuelLevel): number {
		if (!fuelData.length) return 0;

		for (const { level, amount } of fuelData) {
			if (level === 1 && amount === 0) return 0;
			if (level === 1 && amount > 0) return 1;
			if (level >= 2 && amount > 0) return level;
		}

		return 0; // Default state if no conditions are met
	}

	onMount(() => {
		getFuelLevel();
	});

	$: currentState = determineRocketState(fuelData);
</script>

<div class="flex justify-center lg:justify-start">
	<div id="rocket set" class="relative flex w-[350px] lg:w-[550px] items-center">
		<div class="absolute left-[-130px] top-[120px] z-[-1] md:left-[-120px]">
			<img src="/img/fuel/bow.png" alt="bow-img" />
		</div>
		<div class="">
			{#if fuelData.length > 0}
				<img
					src={`/img/fuel/rockets/${currentState}.png`}
					alt="Rocket state {currentState}"
					class="h-[390px] w-auto md:h-[580px] lg:h-[700px]"
				/>
			{/if}
		</div>

		<div
			class="absolute left-[113px] top-[55px] flex w-[250px] flex-col gap-[4px] md:left-[59%] md:gap-[22px] md:top-[14%] lg:left-[55%] lg:top-[14%] lg:gap-[27px]"
		>
			{#each fuelData as data, i}
				<div class="flex items-center justify-end">
					{#if data.level !== 2 && data.level !== 3}
						<img src="/img/fuel/lines/{data.level}.png" alt="line {data.level}" class="mr-2 h-auto w-auto" />
					{/if}
					<img src="/img/fuel/levels/{data.level}.png" alt="level {data.level}" class="h-auto w-auto" />
					<div
						class="z-[-1] flex h-[30px] w-[90px] translate-x-[-20px] justify-end rounded-lg bg-black/25 p-1 pr-2"
					>
						<Text size="sm" class="font-bold">{data.amount} pEIC</Text>
					</div>
				</div>
			{/each}
			<!-- {#each levelState as state, i}
				<div class="flex items-center justify-end">
					{#if state !== 2 && state !== 3}
						<div class="line-with-dots mr-2 w-[100px]"></div>
					{/if}
					<img src="/img/fuel/levels/{state}.png" alt="level {state}" class="h-auto w-auto" />
					<div
						class="z-[-1] flex h-[30px] w-[90px] translate-x-[-20px] justify-end rounded-lg bg-black/25 p-1 pr-2"
					>
						<Text size="sm" class="font-bold">100 pEIC</Text>
					</div>
				</div>
			{/each} -->
		</div>
	</div>
</div>

<!-- <style>
    .line-with-dots {
    position: relative;
    height: 2px;
    background-color: purple;
}

.line-with-dots::before,
.line-with-dots::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: purple;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
}

.line-with-dots::before {
    left: -3px;
}

.line-with-dots::after {
    right: -3px;
}
</style> -->