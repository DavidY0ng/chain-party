<script lang="ts">
	import ClaimAPI from '$lib/api/claim';
	import * as Claim from '$lib/components/page/claim/index';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Text } from '$lib/components/ui/text';
	import { isToken } from '$lib/stores/storeCommon';
	import type { TTotalClaimed } from '$lib/type/claimType';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
	import { t } from '$lib/i18n';

	// Data
	let totalClaimed: TTotalClaimed;
	let totalAvailableClaim: number;

	async function getTotalToBeClaimed() {
		const result = await ClaimAPI.claimed.getTotal();
		if (result.success) {
			totalClaimed = result.data;
		} else {
			throw new Error('Failed to get total claimed');
		}
	}

	onMount(() => {
		if ($isToken === undefined) return;
		getTotalToBeClaimed();
	});
</script>

<div in:fade class="relative h-full min-h-screen w-full px-4 xl:px-0">
	<div class="relative m-auto -mt-5 w-full max-w-[1400px] space-y-20 pt-[20px] md:pt-[40px]">
		<div class="relative flex w-full flex-col gap-x-5 gap-y-5 md:flex-row">
			<Card.Root class=" h-full max-h-[200px] w-full overflow-hidden rounded-2xl border-none">
				<Card.Header
					class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
				>
					<img src="/img/claim/available.png" class="-mb-1 h-5 w-5" alt="" />
					<Text class="font-bold">{$t('claim.available_for_claim')}</Text>
				</Card.Header>
				<div class="relative h-full w-full overflow-hidden bg-black/20 p-0 py-8 text-center">
					<Text
						size="3xl"
						class="relative z-10 flex h-full w-full items-center justify-center text-center"
						>{$storeUserInfo.web3_address !== zeroAddress ? (totalAvailableClaim ?? 0) : '-'}</Text
					>
					<div class="pink-eclipse left-[30%] w-1/2 blur-[90px] md:bottom-[-280%]"></div>
				</div>
			</Card.Root>
			<Card.Root class=" h-full max-h-[200px] w-full overflow-hidden rounded-2xl border-none">
				<Card.Header
					class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
				>
					<img src="/img/claim/total.png" class="-mb-1 h-5 w-5" alt="" />
					<Text class="font-bold">{$t('claim.total_claimed')}</Text>
				</Card.Header>
				<div
					class="relative flex h-full w-full items-center justify-center gap-x-7 overflow-hidden bg-black/20 p-0 py-8 text-center"
				>
					{#if $storeUserInfo.web3_address !== zeroAddress}
						<Text
							class="relative z-10 flex items-center justify-center  text-center text-2xl md:text-3xl"
							>{totalClaimed?.peic | 0} pEIC</Text
						>
						<img src="/img/claim/3line.png" alt="" />
						<Text
							class="relative z-10 flex items-center justify-center  text-center text-2xl md:text-3xl"
							>{totalClaimed?.usdt | 0} USDT</Text
						>
					{:else}
						<Text size="3xl" class="relative z-10 flex  items-center justify-center text-center"
							>-</Text
						>
					{/if}
					<div
						class="purple-eclipse bottom-[-100%] left-[20%] w-[60%] blur-[60px] md:bottom-[-280%]"
					></div>
				</div>
			</Card.Root>
		</div>
		<div class="space-y-8">
			<Claim.Game bind:totalAvailableClaim />
			<Claim.Reward />
		</div>
	</div>
</div>
