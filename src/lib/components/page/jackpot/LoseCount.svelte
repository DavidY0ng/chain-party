<script lang="ts">
	import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';
    
	export let jackpotPoolLoseCount: number = 0;
    export let classes = ''

</script>

<div id="total game lose" class="flex flex-col gap-2 bg-black/25 rounded-2xl px-5 py-3 w-full  items-center {classes}">
    <Text tag="h1" size="sm" class="text-[14px]">{$t('jackpot.total_lose_times')}:</Text>
    <div class="flex justify-center items-center gap-1">
        {#if jackpotPoolLoseCount === 0}
        <Text size="4xl" class="leading-none"> - </Text>
        {:else}
        <Text tag="h1" size="default" class=" text-[20px] font-bold text-[#DF61FF] translate-y-[-5%]"
            >{jackpotPoolLoseCount}</Text
        >
        <Text size="default" class="text-[16px]"> / 5</Text>
        {/if}
    </div>
</div>