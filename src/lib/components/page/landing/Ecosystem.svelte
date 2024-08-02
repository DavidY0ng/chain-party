<script lang='ts'>
        import { Text } from '$lib/components/ui/text';
</script>

<div class="flex flex-col gap-5 items-center">
    <div class="mb-20">
        <Text size='3xl'>
            ECOSYSTEM PARTNER
        </Text>
    </div>
    
    <div class="grid xl:grid-cols-3 grid-cols-2 gap-5 w-full">
        {#each Array(9) as _ ,i}
        <div class="bg-gray-500 h-[100px] xl:w-[300px]">
            <img src='' class='' alt='partner'>
        </div>
        {/each}
    </div>
   
</div >