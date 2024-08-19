<script lang="ts">
	import DashboardAPI from '$lib/api/dashboard';
	import JackpotAPI from '$lib/api/jackpot';
	import * as Home from '$lib/components/page/home';
	import IntersectionObserver from '$lib/components/shared/IntersectionObserver.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import type { TDashboardPool } from '$lib/type/dashboardType';
	import type { TCurrentList } from '$lib/type/jackpotType';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { isDesktop } from '$lib/stores/storeCommon';

	// Data
	let currentList: TCurrentList;
	let jackpotPoolAmount = {
		integer: [] as string[],
		decimal: [] as string[]
	};
	let planetReward: TDashboardPool;

	// Pagination
	let pagination = {
		page: 0,
		size: 50
	};

	let intersecting: boolean = false;

	async function getDashboardGame() {
		const result = await DashboardAPI.planet.getReward();
		if (result.success) {
			planetReward = result.data;
		} else {
			throw new Error('Failed to fetch Planet Reward');
		}
	}

	async function getCurrentList() {
		pagination.page++;
		const result = await JackpotAPI.getCurrentList(pagination);
		if (result.success) {
			if (pagination.page === 1) {
				currentList = result.data;
			} else {
				currentList = {
					...result.data,
					data: [...currentList.data, ...result.data.data]
				};
			}
		} else {
			throw new Error('Failed to fetch winner list');
		}
	}

	// Get jackpot pool amount
	async function getJackpotPool() {
		const result = await JackpotAPI.getPool();

		if (result.success) {
			handleSplitNumber(result.data.amount);
		}
	}

	function handleSplitNumber(number: number) {
		let decimal: number = 0;

		if (number > 0) {
			let integerPart: string = String(Math.floor(number));
			let formattedIntegerPart = [];

			// Add dot every three digits from the right
			for (let i = 0; i < integerPart.length; i++) {
				if (i > 0 && (integerPart.length - i) % 3 === 0) {
					formattedIntegerPart.push(',');
				}
				formattedIntegerPart.push(integerPart[i]);
			}

			jackpotPoolAmount.integer = formattedIntegerPart;

			decimal = number - Number(integerPart);
		} else {
			jackpotPoolAmount.integer = ['0'];
		}

		if (decimal > 0) {
			const decimalPart = decimal.toFixed(2).split('.')[1];
			jackpotPoolAmount.decimal = decimalPart.split('');
		} else {
			jackpotPoolAmount.decimal = ['0', '0'];
		}
	}

	$: if (intersecting && pagination.page < currentList.last_page) {
		getCurrentList();
	}

	onMount(() => {
		getDashboardGame();
		getJackpotPool();
		getCurrentList();
	});
</script>

<div in:fade class="relative h-full min-h-screen w-full p-4 xl:p-0">
	<div
		class="pink-eclipse left-[-30%] top-[-15%] w-[350px] blur-[120px] xl:left-[-10%] xl:top-[-30%] xl:w-[560px]"
	/>
	<div class="relative z-[99] m-auto max-w-[1400px] space-y-28">
		<div id="Pool List" class=" space-y-5">
			{#if $isDesktop}
				<div class="flex w-full gap-y-0">
					{#each Array(2) as _, i}
						<Home.DesktopBigPoolCard bind:planetReward index={i} />
					{/each}
				</div>
				<div class="grid grid-cols-3 gap-x-5">
					{#each Array(3) as _, i}
						<Home.DesktopSmallPoolCard index={i + 2} bind:planetReward />
					{/each}
				</div>
			{:else}
				{#each Array(5) as _, i}
					<Home.DesktopSmallPoolCard index={i} bind:planetReward />
				{/each}
			{/if}
		</div>

		<div id="Jackpot Pool" class="flex flex-col items-center space-y-5">
			<div class="jackpotPool relative z-10 w-full max-w-[1000px] rounded-2xl pb-5 pt-10">
				<img
					src="/img/home/jackpot&pool.png"
					class="absolute -top-[40%] left-[50%] translate-x-[-50%]"
					alt=""
				/>
				<div class="flex w-full items-end justify-center gap-x-1 xl:gap-x-2">
					{#each jackpotPoolAmount.integer as number, i}
						<div
							class="{number === ',' ? '-mb-2 xl:text-3xl' : 'bubbleNumber  w-full max-w-[50px]'} 
								{jackpotPoolAmount.integer?.length > 5
								? 'text-lg xl:text-2xl'
								: 'text-2xl'} flex h-[45px] max-w-[35px] items-center justify-center rounded-lg text-center font-bold xl:h-[60px] xl:max-w-[50px] xl:rounded-2xl"
						>
							{number}
						</div>
					{/each}
					<Text class="-translate-y-2 text-md font-bold xl:translate-y-0 xl:text-3xl">.</Text>
					{#each jackpotPoolAmount.decimal as decimal}
						<div
							class="{jackpotPoolAmount.integer?.length > 5
								? 'text-lg xl:text-2xl'
								: 'text-2xl'}  bubbleNumber flex h-[45px] w-full max-w-[35px] items-center justify-center rounded-lg text-center font-bold xl:h-[60px] xl:max-w-[50px] xl:rounded-2xl"
						>
							{decimal}
						</div>
					{/each}
					<Text class="hidden text-md xl:block xl:text-xl">pEIC</Text>
				</div>
				<Text class="mt-2 w-full text-center text-xl font-bold xl:hidden">pEIC</Text>
			</div>
			<div class="w-full space-y-3">
				<div
					id="jackpotTableHeader"
					class="flex w-full items-center justify-between rounded-xl bg-[#481555] px-7 py-4 font-bold"
				>
					<Text>{$t('home.address')}</Text>
					<Text>{$t('home.won_times')}</Text>
				</div>
				{#if currentList?.data.length > 0}
					{#each currentList.data as user, i}
						{#if user.is_self}
							<div class="overflow-hidden rounded-2xl">
								<div class="selfContainer w-full border-x-[6px]">
									<div class="rounded bg-[#000000]/30 px-6 py-4">
										<Text>{user.address}</Text>
									</div>
								</div>
							</div>
						{/if}
					{/each}
				{/if}
				<div
					class="gradientScrollbar {currentList?.data.length > 0
						? 'max-h-[500px] '
						: 'h-[200px]'} w-full overflow-y-scroll rounded-2xl bg-black/20"
				>
					{#if currentList?.data.length > 0}
						{#each currentList.data as user, i}
							<div class="flex items-center justify-between px-8 py-4">
								<Text>{user.address}</Text>
								<Text>{user.count}</Text>
							</div>
						{/each}
						{#if pagination.page < currentList.last_page}
							<IntersectionObserver bind:intersecting>
								<Skeleton class="mx-auto mb-2 h-[50px] w-[97%] rounded-xl bg-black/50" />
							</IntersectionObserver>
						{/if}
					{:else}
						<div class="flex h-full w-full items-center justify-center text-center">
							<Text size="xl">No Winner Record Available</Text>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style scoped>
	.jackpotPool {
		background: radial-gradient(45.78% 88.85% at 50% 100%, #5b1dab 0%, rgba(0, 0, 0, 0.25) 100%);
	}

	#jackpotTableHeader {
		border-bottom: 2px solid;
		border-image-source: linear-gradient(
			90deg,
			rgba(255, 94, 220, 0) 0%,
			#ff5edc 50.5%,
			rgba(255, 94, 220, 0) 100%
		);
	}
</style>
