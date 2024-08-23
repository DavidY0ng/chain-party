<script lang="ts">
	import DonationModal from '$lib/components/page/donate/DonationModal.svelte';
	import LeaderboardList from '$lib/components/page/donate/LeaderboardList.svelte';
	import RankCard from '$lib/components/page/donate/RankCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/i18n';
	import { isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { connectWallet } from '$lib/web3/wagmi';
	import { fade } from 'svelte/transition';
	import { zeroAddress } from 'viem';


	const handleConnect = async () => {
		await connectWallet();
	};

</script>

<div in:fade class="h-full min-h-screen w-full space-y-5 xl:space-y-10 p-4">
	<div class="relative z-[99] m-auto max-w-[1400px] space-y-10">
		<div class="relative flex flex-col items-center xl:pt-[100px] pt-[20px] ">
			<div class="block md:hidden pink-eclipse top-[5%] h-[350px] w-[250px] blur-[70px]"></div>
			<div class="hidden md:block pink-eclipse top-0 h-[200px] w-[750px] blur-[70px]"></div>
			<RankCard />
			<div class="mb-10 pt-5 md:pt-0">
				{#if $storeUserInfo.web3_address === zeroAddress || $isToken === undefined}
					<div class="mx-auto w-[300px]">
						<Button on:click={handleConnect} class="w-full bg-[#29193D]">{$t('donate.connect_wallet')}</Button>
					</div>
				{:else}
					<DonationModal />
				{/if}
			</div>
			<LeaderboardList />
		</div>
	</div>
</div>
