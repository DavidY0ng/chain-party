<script lang="ts">
	import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';
	import { truncateString } from '$lib/helper';
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { isDesktop } from '$lib/stores/storeCommon';
	import type { TDonationLeaderboard } from '$lib/type/donationType';
	import DonationAPI from '$lib/api/donation';
	import IntersectionObserver from '$lib/components/shared/IntersectionObserver.svelte';
	import { onMount } from 'svelte';

	let leaderboardListPagination = {
		page: 0,
		size: 20
	};

	let leaderboardList: TDonationLeaderboard;
    let intersecting: boolean = false;

	async function getLeaderboardList() {
        leaderboardListPagination.page++
		const result = await DonationAPI.getLeaderboard(leaderboardListPagination);
		if (result.success) {
			if (leaderboardListPagination.page === 1) {
				leaderboardList = result.data;
			} else {
				leaderboardList = {
					...result.data,
					data: [...leaderboardList.data, ...result.data.data]
				};
			}
		} else {
			throw new Error('Failed to fetch leaderboard list');
		}
	}

    $: if (intersecting && leaderboardListPagination.page < leaderboardList.last_page) {
		getLeaderboardList();
	}

	onMount(() => {
		getLeaderboardList();
	});
</script>

<!-- desktop view -->
<div class="w-full space-y-3 md:block hidden">
	<div
		class="gradient-border-bottom flex w-full items-center justify-between rounded-xl bg-[#481555] px-7 py-4 font-bold"
	>
		<div class="flex gap-[40px] xl:gap-[80px]">
			<Text class="w-[50px] whitespace-nowrap">{$t('donate.rank')}</Text>
			<Text class="whitespace-nowrap">{$t('donate.address')}</Text>
		</div>

		<Text class="whitespace-nowrap">{$t('donate.amount')}</Text>
	</div>
	<div class="gradientScrollbar h-[700px] w-full overflow-y-scroll rounded-2xl bg-black/20">
		{#if leaderboardList?.data.length > 3}
			{#each leaderboardList.data.slice(3) as data, i}
				<div class="flex items-center justify-between px-8 py-4">
					<div class="flex gap-[20px] xl:gap-[80px]">
						<Text class="w-[50px]">{data.rank}</Text>
						<Text>{data.address}</Text>
					</div>

					<Text>{data.amount} pEIC</Text>
					<!-- Replace 949 with the actual data value -->
				</div>
			{/each}
            {#if leaderboardListPagination.page < leaderboardList.last_page}
                <IntersectionObserver bind:intersecting>
                    <Skeleton class="mx-auto mb-2 h-[50px] w-[97%] rounded-xl bg-black/50" />
                </IntersectionObserver>
            {/if}
        {:else}
            <div class="flex h-full w-full items-center justify-center text-center">
                <Text size="xl">No Record Available</Text>
            </div>
        {/if}
	</div>
</div>

<!-- mobile view -->
<div class="w-full space-y-3 md:hidden block">
	<div
		class="gradient-border-bottom flex w-full items-center justify-between rounded-xl bg-[#481555] px-5 py-4 font-bold"
	>
		<Text class="w-[50px] whitespace-nowrap">{$t('donate.rank')}</Text>
		<Text class="whitespace-nowrap">{$t('donate.address')}</Text>
	</div>

	<div class="gradientScrollbar h-[700px] w-full overflow-y-scroll rounded-2xl bg-black/20">
		{#if leaderboardList?.data.length > 3}
			{#each leaderboardList.data.slice(3) as data, i}
				<div class="flex flex-col px-5 py-4">
					<div class="flex justify-between">
						<Text class="">Rank {data.rank}</Text>
						<Text>{truncateString(data.address, 7, 7)}</Text>
					</div>
						
					<div class="flex justify-between">
						<Text class="text-white/40">Donated Amount:</Text>
						<Text>{data.amount} pEIC</Text>
					</div>
				</div>
			{/each}
            {#if leaderboardListPagination.page < leaderboardList.last_page}
                <IntersectionObserver bind:intersecting>
                    <Skeleton class="mx-auto mb-2 h-[50px] w-[97%] rounded-xl bg-black/50" />
                </IntersectionObserver>
            {/if}
        {:else}
            <div class="flex h-full w-full items-center justify-center text-center">
                <Text size="xl">No Record Available</Text>
            </div>
        {/if}
	</div>
</div>
