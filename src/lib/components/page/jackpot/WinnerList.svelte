<script>
	import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';
	import { Button } from '$lib/components/ui/button';
	import JackpotAPI from '$lib/api/jackpot';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { isToken } from '$lib/stores/storeCommon';
	import { zeroAddress } from 'viem';
    import { isDesktop } from '$lib/stores/storeCommon';
    import { truncateString } from '$lib/helper';

	let winnerListPagination = {
			page: 1,
			size: 1
		},
		currentListPagination = {
			page: 1,
			size: 1
		};

	async function getWinnerList() {
		const result = await JackpotAPI.getWinnerList(winnerListPagination);
	}

	onMount(() => {
		getWinnerList();
	});
</script>

<div id="winner list">
	<div class="w-full space-y-3">
		<div
			class="gradient-border-bottom flex w-full items-center justify-between overflow-hidden rounded-xl bg-[#481555] font-bold"
		>
			<Text class="pl-8">{$t('jackpot.winner_list')}</Text>
			<div class="flex items-center gap-3 bg-gradient-to-t from-[#AC4FF4] to-[#F72E9A] px-4 py-2">
				<Button class="p-0 font-thin underline">{$t('jackpot.how_to_join')}</Button>
				<Icon icon="fluent:open-24-filled" width="1.2em" height="1.2em" />
			</div>
		</div>
		<div class="h-[500px] w-full overflow-y-scroll rounded-2xl bg-black/20">
			{#if $storeUserInfo.web3_address !== zeroAddress && $isToken !== undefined}
				{#each Array(10) as _, i}
					<div class="flex items-center justify-between px-8 py-4">
                        {#if !isDesktop}
						    <Text>0x9693CD9713496b0712f52E5F0c7b8948abdA824D</Text>
                        {:else}
                            <Text>{truncateString('0x9693CD9713496b0712f52E5F0c7b8948abdA824D',7,7)}</Text>
                        {/if}
						<div class="flex justify-between xl:gap-x-[100px] gap-3">
							<div class="flex gap-x-2">
								<img src="/img/jackpot/cap.png" class="h-[20px] w-[20px]" alt="cap" />
								<Text class="hidden xl:flex">Won</Text>
							</div>
							<Text>813 pEIC</Text>
						</div>
					</div>
				{/each}
			{:else}
				{#each Array(10) as _, i}
					<div class="flex items-center justify-between px-8 py-4">
						<Text>0x9693CD9713496b0712f52E5F0c7b8948abdA824D</Text>
						<div class="flex">
							<Text>WON 813 pEIC</Text>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
</style>
