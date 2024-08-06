<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DonationAPI, { type TDonationLeaderboard } from '$lib/api/donation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { onConnectWallet } from '$lib/utils';
	import RankCard from '$lib/components/page/donate/RankCard.svelte';
	import LeaderboardList from '$lib/components/page/donate/LeaderboardList.svelte';
	import { isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
	import DonationModal from '$lib/components/page/donate/DonationModal.svelte'
	

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

	const handleConnect = async () => {
		await onConnectWallet();
	};

	onMount(() => {
		onGetLeaderBoard();
	});
</script>

<div in:fade class="h-full min-h-screen w-full space-y-5 xl:space-y-10">
	<div class="relative z-[99] m-auto max-w-[1400px] space-y-28">
		<div class="flex flex-col items-center">
			<RankCard />
			{#if $storeUserInfo.web3_address === zeroAddress || $isToken === undefined}
			<div class="mx-auto my-5 w-[250px]">
				<Button on:click={handleConnect} class="w-full bg-[#29193D]">Connect Wallet</Button>
	
			</div>
			{:else}
			<DonationModal />
			{/if}
		</div>
		<!-- Desktop Leaderboard list -->
		<LeaderboardList />
	
	</div>
	
</div>
