<script lang="ts">
    import FuelApi from "$lib/api/fuel";
    import { onMount } from "svelte";
    import type { TFuelLevel } from "$lib/type/fuelType";

    const levelState = [10,9,8,7,6,5,4,3,2,1];
    let fuelData: TFuelLevel = [];

    async function getFuelLevel() {
        const result = await FuelApi.getFuelLevel();

        if (result.success) {
            fuelData = result.data; // Assuming result.data is an array of levels and amounts
            console.log(fuelData)
        }
    }

    function determineRocketState(fuelData: TFuelLevel): number {
        if (!fuelData.length) return 0;

        for (const { level, amount } of fuelData) {
            if (level === 1 && amount === 0) return 0;
            if (level === 1 && amount > 0) return 1;
            if (level >= 2 && amount > 0) return level;
        }

        return 0; // Default state if no conditions are met
    }

    onMount(() => {
        getFuelLevel();
    });

    $: currentState = determineRocketState(fuelData);
</script>

<div class="flex items-center  w-[400px]">
    <div class="">
        {#if fuelData.length > 0}
            <img 
                src={`/img/fuel/rockets/${currentState}.png`} 
                alt='Rocket state {currentState}' 
                class="w-auto h-[500px] ">
        {/if}
    </div>
    
    <div class="flex flex-col w-[160px] gap-[13.5px] absolute left-[160px] top-[90px]">
        {#each levelState as state, i}
            <div class="flex items-center justify-end">
                {#if state !== 2 && state !== 3}
                    <img src='/img/fuel/lines/{state}.png' alt='line {state}' class="w-auto h-auto mr-2">
                {/if}
                <img src='/img/fuel/levels/{state}.png' alt='level {state}' class="w-auto h-auto">
            </div>
        {/each}
    </div>
</div>


