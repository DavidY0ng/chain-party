<script lang="ts">
    import { t } from '$lib/i18n';
    import Text from '$lib/components/ui/text/text.svelte';
	import { truncateString } from '$lib/helper';
    import { isDesktop } from '$lib/stores/storeCommon';
    import type { TDonationLeaderboard } from '$lib/type/donationType';
    import DonationAPI from '$lib/api/donation';
    import IntersectionObserver from '$lib/components/shared/IntersectionObserver.svelte';
	import { onMount } from 'svelte';

    let pageSize = 20

    let leaderboardList: TDonationLeaderboard
    
    async function getLeaderboardList() {
		const result = await DonationAPI.getLeaderboard(pageSize);
		if (result.success) {
			leaderboardList = result.data;
		} else {
			throw new Error('Failed to fetch leaderboard list');
		}
	}

    onMount(() => {
		getLeaderboardList();
	});
</script>

<div class="w-full space-y-3 ">
    <div
        class="flex w-full items-center justify-between rounded-xl bg-[#481555] px-7 py-4 font-bold gradient-border-bottom"
    >
        <div class="flex xl:gap-[80px] gap-[40px]">
            <Text class="w-[50px] whitespace-nowrap">{$t('donate.rank')}</Text>
            <Text class="whitespace-nowrap">{$t('donate.address')}</Text>
        </div>
        
        <Text class="whitespace-nowrap">{$t('donate.amount')}</Text>
    </div>
    <div class="h-[700px] w-full overflow-y-scroll rounded-2xl bg-black/20 gradientScrollbar">
        {#if leaderboardList}
            {#each leaderboardList.data as data, i}
                <div class="flex items-center justify-between px-8 py-4">
                    <div class="flex xl:gap-[80px] gap-[20px]">
                        <Text class="w-[50px]">{i + 4}</Text>
                        {#if $isDesktop}
                            <Text>0x9693CD9713496b0712f52E5F0c7b8948abdA824D</Text>
                        {:else}
                            <Text>{truncateString("0x9693CD9713496b0712f52E5F0c7b8948abdA824D",5,5)}</Text>
                        {/if}
                    </div>
                    
                    <Text>949 pEIC</Text>
                </div>
            {/each}
        {/if}
    </div>
</div>