<script lang="ts">
	import UserAPI from '$lib/api/user';
	import ConnectWalletToView from '$lib/components/shared/ConnectWalletToView.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Text } from '$lib/components/ui/text';
	import Treeview from '$lib/components/ui/treeview/Treeview.svelte';
	import { copyToClipboard } from '$lib/helper';
	import { t } from '$lib/i18n';
	import { isToken, rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { zeroAddress } from 'viem';

	const referralLink = `https://eicdapp.skywalkerlab.dev/?referralCode=${$storeUserInfo.referral_code}`;

	let downlineList = {
		web3_address: 'None',
		downline_count: 0,
		children: []
	};

	async function getDownline() {
		if ($isToken === undefined) return [];
		const result = await UserAPI.team.getDownline($storeUserInfo.web3_address);

		if (result.success) {
			const treeData = {
				web3_address: $storeUserInfo.web3_address,
				downline_count: result.data.length,
				children: []
			};

			return (downlineList = treeData);
		} else {
			throw new Error(`Failed to fetch initial downline`);
		}
	}

	storeUserInfo.subscribe(async (value) => {
		if (value.web3_address !== zeroAddress) {
			await getDownline();
		} else {
			downlineList = {
				web3_address: 'None',
				downline_count: 0,
				children: []
			};
		}
		rerender.set(!$rerender);
	});

	onMount(() => {
		getDownline();
	});
</script>

<div in:fade class="m-auto h-full min-h-screen w-full max-w-[1400px] space-y-10 px-4 xl:px-0">
	<Card.Root class="overflow-hidden rounded-2xl border-none">
		<Card.Header class=" gradient-border-bottom bg-[#481555] px-7 py-4">
			<div class="flex items-center gap-x-3">
				<img src="/img/desktopSideMenu/Referral.png" class="h-5 w-5" alt="" />
				<Text class="font-bold">Your Invite Link</Text>
			</div>
		</Card.Header>
		<Card.Content class="bg-black/20 pt-5">
			<div class="relative">
				<Input
					class="border-none bg-black/40 px-4 py-2 text-sm md:px-7 md:py-8 md:text-xl {$storeUserInfo.web3_address ===
					zeroAddress
						? 'text-center'
						: ''}"
					value={$storeUserInfo.web3_address === zeroAddress ? '-' : referralLink}
					readonly
				/>
				<div
					class="mx-auto mt-3 block w-[90%] md:hidden {$storeUserInfo.web3_address === zeroAddress
						? 'hidden'
						: 'block'}"
				>
					<Button
						on:click={() => {
							copyToClipboard(referralLink);
						}}
						class=" w-full bg-[#1D0720] text-sm">Copy Link</Button
					>
				</div>
				<div
					class="absolute right-2 top-[15%] hidden max-w-[120px] md:block {$storeUserInfo.web3_address ===
					zeroAddress
						? 'hidden'
						: 'block'}"
				>
					<Button
						on:click={() => {
							copyToClipboard(referralLink);
						}}
						class=" w-full bg-[#1D0720] ">Copy Link</Button
					>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
	<div class="w-full space-y-5">
		<div
			class="gradient-border-bottom flex w-full items-center gap-x-3 rounded-lg bg-[#481555] px-4 py-4 md:px-7"
		>
			<img src="/img/desktopSideMenu/Team.png" class="h-5 w-5" alt="" />
			<Text class="font-bold">{$t('referral.your_team')}</Text>
		</div>
		{#if $storeUserInfo.web3_address !== zeroAddress}
			<!-- Use the key to force rerendering -->
			{#key $rerender}
				<!-- Use the key to force rerendering -->
				<Treeview bind:tree={downlineList} />
			{/key}
		{:else}
			<ConnectWalletToView class="bg-black/50" />
		{/if}
	</div>
</div>
