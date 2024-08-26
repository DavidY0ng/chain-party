<script lang="ts">
	import FuelApi from '$lib/api/fuel';
	import { onMount } from 'svelte';
	import type { TFuelLevel } from '$lib/type/fuelType';
	import { Text } from '$lib/components/ui/text';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
	import { isToken } from '$lib/stores/storeCommon';
	interface CustomWidths {
		line1: number;
		line2: number;
		line3: number;
		line4: number;
		line5: number;
		line6: number;
		line7: number;
		line8: number;
		line9: number;
		line10: number;
	}
	const levelState = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
	const customMobileWidths: CustomWidths = {
		line1: 90,
		line2: 78,
		line3: 70,
		line4: 63,
		line5: 60,
		line6: 63,
		line7: 50,
		line8: 0,
		line9: 0,
		line10: 70
	};
	const customDesktopWidths: CustomWidths = {
		line1: 160,
		line2: 135,
		line3: 120,
		line4: 110,
		line5: 100,
		line6: 105,
		line7: 100,
		line8: 0,
		line9: 0,
		line10: 120
	};
	const lineNames: (keyof CustomWidths)[] = [
		'line1',
		'line2',
		'line3',
		'line4',
		'line5',
		'line6',
		'line7',
		'line8',
		'line9',
		'line10'
	];
	let fuelData: TFuelLevel = [];
	let unsubscribe;

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

	storeUserInfo.subscribe((value) => {
		if (value.web3_address !== zeroAddress) {
			getFuelLevel();
		}
	});

	onMount(() => {
		if ($isToken === undefined) return;
		getFuelLevel();
	});

	$: currentState = determineRocketState(fuelData);
</script>

<div class="flex justify-center lg:justify-start lg:pl-[50px]">
	<div id="rocket set" class="relative flex w-[350px] items-center lg:w-[550px]">
		<div class="absolute left-[-130px] top-[120px] z-[-1] md:left-[-120px]">
			<img src="/img/fuel/bow.png" alt="bow-img" />
		</div>
		<div class="">
			{#if $storeUserInfo.web3_address === zeroAddress || $isToken === undefined}
				<img
					src={`/img/fuel/rockets/0.png`}
					alt="Rocket state 0"
					class="h-[390px] w-auto md:h-[580px] lg:h-[700px]"
				/>
			{:else if fuelData.length > 0}
				<img
					src={`/img/fuel/rockets/${currentState}.png`}
					alt="Rocket state {currentState}"
					class="h-[390px] w-auto md:h-[580px] lg:h-[700px]"
				/>
			{/if}
		</div>

		<div
			class="absolute left-[113px] top-[55px] flex w-[250px] flex-col gap-[4px] md:left-[59%] md:top-[14%] md:gap-[22px] lg:left-[35%] lg:top-[14%] lg:w-[350px] lg:gap-[32px]"
		>
		{#if $storeUserInfo.web3_address !== zeroAddress && $isToken !== undefined}
        {#if fuelData.length}
            {#each fuelData as data, i}
                <div class="flex items-center justify-end">
                    {#if data.level !== 2 && data.level !== 3}
                        <div
                            id="mobile line"
                            class="line-with-dots mr-2 block lg:hidden {data.level <= currentState ? '' : 'opacity-[0.3]'}"
                            style="width: {customMobileWidths[lineNames[i]]}px;"
                        ></div>
                        <div
                            id="desktop line"
                            class="line-with-dots mr-2 hidden lg:block {data.level <= currentState ? '' : 'opacity-[0.3]'}"
                            style="width: {customDesktopWidths[lineNames[i]]}px;"
                        ></div>
                    {/if}
                    <img
                        src="/img/fuel/levels/{data.level}.png"
                        alt="level {data.level}"
                        class="h-auto w-auto {data.level > currentState ? 'mix-blend-luminosity' : ''}"
                    />
                    <div
                        class="z-[-1] flex h-[30px] w-[90px] translate-x-[-30px] justify-end rounded-lg bg-black/25 p-1 pr-2"
                    >
                        <Text size="sm" class="font-bold">{data.amount} pEIC</Text>
                    </div>
                </div>
            {/each}
        {/if}
    {:else}
        {#each levelState as data, i}
            <div class="flex items-center justify-end">
                {#if data !== 2 && data !== 3}
                    <div
                        id="mobile line"
                        class="line-with-dots mr-2 block opacity-[0.3] lg:hidden"
                        style="width: {customMobileWidths[lineNames[i]]}px;"
                    ></div>
                    <div
                        id="desktop line"
                        class="line-with-dots mr-2 hidden opacity-[0.3] lg:block"
                        style="width: {customDesktopWidths[lineNames[i]]}px;"
                    ></div>
                {/if}
                <img
                    src="/img/fuel/levels/{data}.png"
                    alt="level {data}"
                    class="h-auto w-auto mix-blend-luminosity"
                />
                <div
                    class="z-[-1] flex h-[30px] w-[90px] translate-x-[-30px] justify-end rounded-lg bg-black/25 p-1 pr-2"
                >
                    <Text size="sm" class="font-bold">0 pEIC</Text>
                </div>
            </div>
        {/each}
    {/if}

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

<style>
	.line-with-dots {
		position: relative;
		height: 2.8px;
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
</style>
