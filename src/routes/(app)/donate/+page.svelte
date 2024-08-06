<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import Icon from '@iconify/svelte';
	import * as Table from '$lib/components/ui/table';
	import DonationAPI, { type TDonationLeaderboard } from '$lib/api/donation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from '$lib/i18n';
	import RankCard from '$lib/components/page/donate/RankCard.svelte';
	import LeaderboardList from '$lib/components/page/donate/LeaderboardList.svelte';

	let leaderboardSize: number = 53;
	let leaderboardData: TDonationLeaderboard;

	async function onGetLeaderBoard() {
		const result = await DonationAPI.getLeaderboard(leaderboardSize);
		if (result.success) {
			leaderboardData = result.data;
		} else {
			throw new Error('Failed to fetch leaderboard');
		}
	}

	onMount(() => {
		onGetLeaderBoard();
	});
</script>

<div in:fade class="h-full min-h-screen w-full space-y-5 xl:space-y-10">
	<div class="relative z-[99] m-auto max-w-[1400px] space-y-28">
		<div class="flex justify-center">
			<RankCard />
		</div>
	
		<!-- Desktop Leaderboard list -->
		<LeaderboardList />
	
		<!-- Mobile Leaderboard list -->
		<div id="Mobile Leaderboard List" class="space-y-3 xl:hidden">
			<Text size="xl" class="text-black">{$t('donate.leaderboard_list')}</Text>
			<Card.Root class="flex justify-between items-center px-2 py-3">
				<Text size="lg" class="text-black font-semibold">{$t('donate.my_address')}</Text>
				<Text size="lg" class="text-black font-semibold">10,000 EIC</Text>
			</Card.Root>
			{#each Array(3) as _, i}
				<Card.Root class="flex items-center justify-between px-2 py-3">
					<Text size="lg" class="font-semibold text-black">Player {i + 1}</Text>
					<Text size="lg" class="font-semibold text-black">10,000 EIC</Text>
				</Card.Root>
			{/each}
		</div>
	</div>
	
</div>
