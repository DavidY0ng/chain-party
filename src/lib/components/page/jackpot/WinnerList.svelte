<script lang="ts">
	import JackpotAPI from '$lib/api/jackpot';
	import { Button } from '$lib/components/ui/button';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { t } from '$lib/i18n';
	import { isDesktop, isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { TWinnerList } from '$lib/type/jackpotType';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { zeroAddress } from 'viem';
	import IntersectionObserver from '$lib/components/shared/IntersectionObserver.svelte';
	import { onTranslateI18nErrMsg, truncateString } from '$lib/helper';

	let winnerListPagination = {
		page: 0,
		size: 50
	};

	let winnerList: TWinnerList;
	let intersecting: boolean = false;

	async function getWinnerList() {
		winnerListPagination.page++;
		const result = await JackpotAPI.getWinnerList(winnerListPagination);
		if (result.success) {
			if (winnerListPagination.page === 1) {
				winnerList = result.data;
			} else {
				winnerList = {
					...result.data,
					data: [...winnerList.data, ...result.data.data]
				};
			}
		} else {
			onTranslateI18nErrMsg(result.data);
			throw new Error('Failed to fetch winner list');
		}
	}

	$: if (intersecting && winnerListPagination.page < winnerList.last_page) {
		getWinnerList();
	}

	onMount(() => {
		getWinnerList();
	});
</script>


	<div class="w-full max-w-[1400px] space-y-3 ">
		<div
			class="gradient-border-bottom flex w-full items-center justify-between overflow-hidden rounded-xl bg-[#481555] font-bold"
		>
			<Text class="pl-8">{$t('jackpot.winner_list')}</Text>
			<div class="flex bg-gradient-to-t from-[#AC4FF4] to-[#F72E9A] px-4 py-2">
				<Button class="bg-transparent p-0 font-thin underline"
					>{$t('jackpot.how_to_join')}
					<span class="pl-3"
						><Icon icon="fluent:open-24-filled" width="1.2em" height="1.2em" /></span
					>
				</Button>
			</div>
		</div>
		<div
			class="gradientScrollbar {$storeUserInfo.web3_address === zeroAddress &&
			$isToken === undefined
				? 'h-[500px]'
				: winnerList?.data.length > 0
					? 'max-h-[350px]'
					: 'h-[350px]'}  w-full overflow-y-scroll rounded-2xl bg-black/20"
		>
			{#if winnerList?.data.length > 0}
				{#each winnerList.data as user, i}
					<div class="flex flex-col md:flex-row md:justify-between px-8 py-4 gap-1">

						<Text class="md:hidden flex">{truncateString(user.address, 15,15)}</Text>
						<Text class="hidden md:flex">{user.address}</Text>

						<div class="flex justify-between md:justify-start md:gap-1">
							<Text>WON</Text>
							<Text>{user.amount} pEIC</Text>
						</div>
					</div>
				{/each}
				{#if winnerListPagination.page < winnerList.last_page}
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

