<script lang="ts">
	import UserAPI from '$lib/api/user';
	import { Text } from '$lib/components/ui/text';
	import Treeview from '$lib/components/ui/treeview/Treeview.svelte';
	import { isToken, rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { zeroAddress } from 'viem';

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

<div in:fade class="h-full min-h-screen w-full space-y-10">
	<Text size="xl">Your Referral: {$storeUserInfo.referral_code}</Text>
	<div class="w-full">
		<Text size="xl">Your Team:</Text>
		{#key $rerender}
			<!-- Use the key to force rerendering -->
			<Treeview bind:tree={downlineList} />
		{/key}
	</div>
</div>
