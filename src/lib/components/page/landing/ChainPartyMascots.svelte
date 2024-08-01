<script>
     import Text from '$lib/components/ui/text/text.svelte';
</script>

<div class="flex flex-col items-center gap-5">
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

    <Text size='2xl'>
        170+ REGISTERED USERS
    </Text>
</div>