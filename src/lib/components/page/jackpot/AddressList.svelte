<script lang="ts">
	import JackpotAPI from '$lib/api/jackpot';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { truncateString } from '$lib/helper';
	import { t } from '$lib/i18n';
	import { isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { TCurrentList } from '$lib/type/jackpotType';
	import { onMount } from 'svelte';
	import { zeroAddress } from 'viem';
	import IntersectionObserver from '$lib/components/shared/IntersectionObserver.svelte';

	let currentListPagination = {
		page: 0,
		size: 50
	};

	let currentList: TCurrentList;
	let intersecting: boolean = false;

	async function getCurrentList() {
		currentListPagination.page++;
		const result = await JackpotAPI.getCurrentList(currentListPagination);
		if (result.success) {
			if (currentListPagination.page === 1) {
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

	$: if (intersecting && currentListPagination.page < currentList.last_page) {
		getCurrentList();
	}

	onMount(() => {
		getCurrentList();
	});
</script>

{#if $storeUserInfo.web3_address !== zeroAddress && $isToken !== undefined}
	<div class="w-full space-y-3">
		<div
			class="gradient-border-bottom flex w-full items-center justify-between rounded-xl bg-[#481555] px-7 py-4 font-bold"
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
			class="gradientScrollbar {$storeUserInfo.web3_address === zeroAddress &&
			$isToken === undefined
				? 'h-[500px]'
				: 'max-h-[350px]'} w-full overflow-y-scroll rounded-2xl bg-black/20"
		>
			{#if currentList?.data.length > 0}
				{#each currentList?.data as user, i}
					<div class="flex items-center justify-between px-8 py-4">
						<Text>{truncateString(user?.address, 7, 7)}</Text>
						<Text>{user?.count}</Text>
					</div>
				{/each}
				{#if currentListPagination.page < currentList.last_page}
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
{/if}
