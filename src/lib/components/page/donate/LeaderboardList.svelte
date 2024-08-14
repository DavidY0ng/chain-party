<script lang="ts">
	import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';
	import { truncateString } from '$lib/helper';
	import { isDesktop } from '$lib/stores/storeCommon';
	import type { TDonationLeaderboard } from '$lib/type/donationType';
	import DonationAPI from '$lib/api/donation';
	import IntersectionObserver from '$lib/components/shared/IntersectionObserver.svelte';
	import { onMount } from 'svelte';

	let pageSize = 20;

	let leaderboardList: TDonationLeaderboard;

	async function getLeaderboardList() {
		const result = await DonationAPI.getLeaderboard(pageSize);
		if (result.success) {
			leaderboardList = result.data;
		} else {
			throw new Error('Failed to fetch leaderboard list');
		}
	}

	onMount(() => {
		getLeaderboardList();
	});
</script>

<div class="w-full space-y-3">
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
						<!-- Add 4 to the index to match your numbering -->
						{#if $isDesktop}
							<Text>{data.address}</Text>
						{:else}
							<Text>{truncateString(data.address, 5, 5)}</Text>
						{/if}
					</div>

					<Text>{data.amount} pEIC</Text>
					<!-- Replace 949 with the actual data value -->
				</div>
			{/each}
        {:else}
            <div class="flex h-full w-full items-center justify-center text-center">
                <Text size="xl">No Record Available</Text>
            </div>
        {/if}
	</div>
</div>
