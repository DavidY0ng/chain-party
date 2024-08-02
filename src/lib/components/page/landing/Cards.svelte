<script lang='ts'>
    	import { t } from '$lib/i18n';
        import Text from '$lib/components/ui/text/text.svelte';

        const cards = [
        {name:$t('landing.card.innovative'), description:$t('landing.card.innovative_description')},
        {name:$t('landing.card.decentralised'), description:$t('landing.card.decentralised_description')},
        {name:$t('landing.card.profitable'), description:$t('landing.card.profitable_description') },
        {name:$t('landing.card.safety'), description:$t('landing.card.safety_description') }
    ]
</script>

<div class="flex flex-col items-center mb-[50px]">
    <Text size='3xl'>
        What is Chain Party?
    </Text>
    <Text size='xl'>
        Where Fun Meets Fair Play
    </Text>
</div>

<div class="grid xl:grid-cols-2 gap-5 p-5 xl:p-0">
    {#each cards as card}
        <div class='border xl:w-[500px] p-5 rounded-lg h-[200px]'>
            <Text tag='h3' size='2xl' class='font-bold'>
                {card.name}
            </Text>
            <Text tag='p' size='lg'>
                {card.description}
            </Text>
        </div>
        
    {/each}
</div>