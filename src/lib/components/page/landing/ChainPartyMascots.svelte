<script lang='ts'>
    import Text from '$lib/components/ui/text/text.svelte';
    import { isDesktop } from '$lib/stores/storeCommon';
    import { t } from '$lib/i18n';
</script>

<div class="flex flex-col items-center gap-5">
    {#if $isDesktop}
    <div class="flex gap-5">
        {#each Array(16) as _ ,i}
            <div class="bg-gray-500 h-[60px] w-[60px]">
                <img src='' class='' alt='mascot'>
            </div>
        {/each}
    </div>
    <div class="flex gap-5 mb-5">
        {#each Array(17) as _ ,i}
            <div class="bg-gray-500 h-[60px] w-[60px]">
                <img src='' class='' alt='mascot'>
            </div>
        {/each}
    </div>
    {:else}
    <div class="flex gap-5">
        {#each Array(6) as _ ,i}
            <div class="bg-gray-500 h-[35px] w-[35px]">
                <img src='' class='' alt='mascot'>
            </div>
        {/each}
    </div>
    <div class="flex gap-5">
        {#each Array(7) as _ ,i}
            <div class="bg-gray-500 h-[35px] w-[35px]">
                <img src='' class='' alt='mascot'>
            </div>
        {/each}
    </div>
    <div class="flex gap-5 mb-5">
        {#each Array(6) as _ ,i}
            <div class="bg-gray-500 h-[35px] w-[35px]">
                <img src='' class='' alt='mascot'>
            </div>
        {/each}
    </div>
    {/if}

    <Text size='2xl'>
        170+ {$t('landing.registered_user')}
    </Text>
</div>