<script lang='ts'>
    export let jackpotPoolLoseCount: number = 0;
    
    const jetState = [0,1,2,3,4,5]
    $: jetIndex = jetState.indexOf(jackpotPoolLoseCount);

</script>

<div class="flex justify-center items-center py-[20px]">
    <div class="absolute inset-0 flex items-center justify-center h-[620px]">
        <img src='/img/jackpot/background/desktop/purple-cloud.png' alt='purple-cloud' class="absolute">
        <img src='/img/jackpot/background/desktop/nova.png' alt='nova' class="absolute">
    </div>
    <div class="asbolute z-10">
        {#if jetIndex !== -1}
        <img 
            src={`/img/jackpot/jet/${jetState[jetIndex]}.png`} 
            alt={`jet ${jetState[jetIndex]}`} 
            class="w-[450px] md:w-[690px] lg:md:auto h-auto ">
        {/if}
    </div>
    
</div>