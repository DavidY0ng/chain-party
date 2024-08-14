<script lang='ts'>
    import Text from '$lib/components/ui/text/text.svelte';

    export let title
</script>

<div class="flex flex-col items-center mb-[50px] px-3">
    <div class="flex items-center md:gap-10  gap-3">
        <img src='/img/landing/cards/drink.png' alt='drink' class='md:h-full h-[50px]'>
        <Text size='lg' class="flex w-full text-[25px] md:text-[40px] text-center pixel-font bg-gradient-to-r from-[#EC05F8] to-[#8C73F9] bg-clip-text text-transparent">
            {title}
        </Text>
        <img src='/img/landing/cards/popcorn.png' alt='drink' class='md:h-full h-[50px]'>
    </div>
    <slot/>
</div>