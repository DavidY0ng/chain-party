<script>
        import { Text } from '$lib/components/ui/text';
        import { t } from '$lib/i18n';
</script>

<div class="flex flex-col gap-5 items-center">
    <div class="mb-20">
        <Text size='3xl'>
            ECOSYSTEM PARTNER
        </Text>
    </div>
    
    <div class="grid grid-cols-3 gap-5">
        {#each Array(9) as _ ,i}
        <div class="bg-gray-500 h-[100px] w-[300px]">
            <img src='' class='' alt='partner'>
        </div>
        {/each}
    </div>
   
</div >