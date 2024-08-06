<script>
    import { t } from '$lib/i18n';
    import Text from '$lib/components/ui/text/text.svelte';
	import JackpotAPI from '$lib/api/jackpot';
	import { onMount } from 'svelte';
    import { storeUserInfo } from '$lib/stores/storeUser';
	import { isToken } from '$lib/stores/storeCommon';
	import { zeroAddress } from 'viem';
    import { isDesktop } from '$lib/stores/storeCommon';
    import { truncateString } from '$lib/helper';

    let addressListPagination = {
			page: 1,
			size: 1
		},
		currentListPagination = {
			page: 1,
			size: 1
		};

	async function getAddressList() {
		const result = await JackpotAPI.getWinnerList(addressListPagination);
	}

	onMount(() => {
		getAddressList();
	});
</script>

{#if $storeUserInfo.web3_address !== zeroAddress && $isToken !== undefined}
<div class="w-full space-y-3">
    <div
        class="flex w-full items-center justify-between rounded-xl bg-[#481555] px-7 py-4 font-bold gradient-border-bottom"
    >
        <Text>{$t('home.address')}</Text>
        <Text>{$t('home.won_times')}</Text>
    </div>
    <div class="overflow-hidden rounded-2xl">
        <div class="selfContainer w-full border-x-[6px]">
            <div class="flex justify-between items-center rounded bg-[#000000]/30 px-6 py-4">
                <Text>{truncateString($storeUserInfo.web3_address,7,7)}</Text>
                <Text>4</Text>
            </div>
        </div>
    </div>
    <div class="h-[500px] w-full overflow-y-scroll rounded-2xl bg-black/20">
        {#each Array(10) as _, i}
            <div class="flex items-center justify-between px-8 py-4">
                <Text>{truncateString("0x9693CD9713496b0712f52E5F0c7b8948abdA824D",7,7)}</Text>
                <Text>3</Text>
            </div>
        {/each}
    </div>
</div>
{/if}
