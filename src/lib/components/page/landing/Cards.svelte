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

<div class="relative flex flex-col items-center w-full h-screen translate-y-[-15%] min-h-[1000px]">
    <div class="flex flex-col items-center absolute top-0 w-full">
        <img src='/img/landing/cards/bow.png' alt='bow' class="z-0 object-cover w-full bg-[#110F27]">
    </div>
    
    <div class="z-10 relative translate-y-[40%]">
        <div class="flex flex-col items-center mb-[50px] ">
            <div class="flex items-center gap-10">
                <img src='/img/landing/cards/drink.png' alt='drink'>
                <Text size='3xl' class="text-center pixel-font bg-gradient-to-r from-[#EC05F8] to-[#8C73F9] bg-clip-text text-transparent">
                    {$t('landing.card_title.1')}?
                </Text>
                <img src='/img/landing/cards/popcorn.png' alt='drink'>
            </div>
            
            <Text size='xl'>
                {$t('landing.card_title.2')}
            </Text>
        </div>
        
        <div class="grid xl:grid-cols-2 gap-5 p-5 xl:p-0 ">

            <div class=" w-full flex flex-col justify-center items-center relative">
                <img src="/img/landing/cards/green rectangle.png" alt="trapezium" class="xl:w-[570px] xl:h-[310px]" />
                
                <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[80%] px-4 flex flex-col gap-3">
                    <div class="flex flex-col items-center">
                        <img src='/img/landing/cards/cube.png' alt='brain'>
                    </div>
                    <Text
                    class=" capitalize  text-white text-center
                            pixel-font md:text-[25px] text-[18px] font-bold md:leading-[38.168px]"
                >
                    {$t('landing.card.innovative')}
                    </Text>
                    <Text tag='p'
                    class=" text-white text-center px-4
                            md:text-[20px] text-[14px] font-bold leading-[22.8px]"
                >
                    {$t('landing.card.innovative_description')}
                    </Text>
                </div>
                
            </div>

            <div class=" w-full flex flex-col justify-center items-center relative z-10">
                <img src="/img/landing/cards/purple rectangle.png" alt="trapezium" class="xl:w-[570px] xl:h-[310px]" />
                
                <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[80%] px-4 flex flex-col gap-3">
                    <div class="flex flex-col items-center">
                        <img src='/img/landing/cards/brain.png' alt='brain'>
                    </div>
                    <Text
                    class=" capitalize  text-white text-center
                            pixel-font md:text-[25px] text-[18px] font-bold md:leading-[38.168px]"
                >
                    {$t('landing.card.decentralised')}
                    </Text>
                    <Text tag='p'
                    class=" text-white text-center px-4
                            md:text-[20px] text-[14px] font-bold leading-[22.8px]"
                >
                    {$t('landing.card.decentralised_description')}
                    </Text>
                </div>
                
            </div>

            <div class=" w-full flex flex-col justify-center items-center relative col-span-2 translate-y-[-15%]">
                <img src="/img/landing/cards/pink rectangle.png" alt="trapezium" class="xl:w-[570px] xl:h-[310px]" />
                
                <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[50%] px-4 flex flex-col gap-3">
                    <div class="flex flex-col items-center">
                        <img src='/img/landing/cards/rocket.png' alt='brain'>
                    </div>
                    <Text
                    class=" capitalize  text-white text-center
                            pixel-font md:text-[25px] text-[18px] font-bold md:leading-[38.168px]"
                >
                    {$t('landing.card.profitable')}
                    </Text>
                    <Text tag='p'
                    class=" text-white text-center px-4
                            md:text-[20px] text-[14px] font-bold leading-[22.8px]"
                >
                    {$t('landing.card.profitable_description')}
                    </Text>
                </div>
                
            </div>
        </div>
    </div>
   
</div>
