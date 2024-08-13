<script lang='ts'>
    import Text from '$lib/components/ui/text/text.svelte';

    export let title
</script>

<div class="flex flex-col items-center mb-[50px] ">
    <div class="flex items-center gap-10">
        <img src='/img/landing/cards/drink.png' alt='drink'>
        <Text size='3xl' class="text-center pixel-font bg-gradient-to-r from-[#EC05F8] to-[#8C73F9] bg-clip-text text-transparent">
            {title}
        </Text>
        <img src='/img/landing/cards/popcorn.png' alt='drink'>
    </div>
    <slot/>
</div>