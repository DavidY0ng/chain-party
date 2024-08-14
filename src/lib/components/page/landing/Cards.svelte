<script lang='ts'>
    	import { t } from '$lib/i18n';
        import Text from '$lib/components/ui/text/text.svelte';
        import Header from './header/Header.svelte';

        const cards = [
            {name:$t('landing.card.innovative'), description:$t('landing.card.innovative_description')},
            {name:$t('landing.card.decentralised'), description:$t('landing.card.decentralised_description')},
            {name:$t('landing.card.profitable'), description:$t('landing.card.profitable_description') },
            {name:$t('landing.card.safety'), description:$t('landing.card.safety_description') }
        ]
</script>

<div class="relative flex flex-col items-center w-full min-h-[80vh] translate-y-custom pb-[150px]">
    <div class="flex flex-col items-center absolute top-[3%] w-full ">
        <img src='/img/landing/cards/bow.png' alt='bow' class="z-0 object-cover w-full bg-[#110F27]">
    </div>
    
    <div class="z-10 relative lg:translate-y-[40%] translate-y-[20%]">
        <Header title= {$t('landing.card_title.1')}?>
            <Text size='xl' class='text-[14px] md:text-[25px] mt-10'>
                {$t('landing.card_title.2')}
            </Text>
        </Header>
        <div class="grid lg:grid-cols-2 gap-5 p-5 md:p-0 ">
            <div class=" w-full flex flex-col justify-center items-center relative">
                <img src="/img/landing/cards/green rectangle.png" alt="trapezium" class="md:w-[570px] md:h-[310px]" />
                
                <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] lg:w-[80%] md:w-[68%] w-full px-4 flex flex-col md:gap-3 gap-1">
                    <div class="flex flex-col items-center">
                        <img src='/img/landing/cards/cube.png' alt='cube' class='h-[25px] md:h-full'>
                    </div>
                    <Text
                    class=" capitalize  text-white text-center
                            pixel-font md:text-[25px] text-[16px] font-bold md:leading-[38.168px]"
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
                <img src="/img/landing/cards/purple rectangle.png" alt="trapezium" class="md:w-[570px] md:h-[310px]" />
                
                <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[80%] md:w-[68%] lg:w-full px-4 flex flex-col md:gap-3 gap-1">
                    <div class="flex flex-col items-center">
                        <img src='/img/landing/cards/brain.png' alt='brain' class='h-[25px] md:h-full'>
                    </div>
                    <Text
                    class=" capitalize  text-white text-center
                            pixel-font md:text-[25px] text-[18px] font-bold md:leading-[38.168px]"
                >
                    {$t('landing.card.decentralised')}
                    </Text>
                    <Text tag='p'
                    class=" text-white text-center px-4
                            md:text-[20px] text-[13px] font-bold leading-[22.8px]"
                >
                    {$t('landing.card.decentralised_description')}
                    </Text>
                </div>
                
            </div>

            <div class=" w-full flex flex-col justify-center items-center relative lg:col-span-2 lg:translate-y-[-15%]">
                <img src="/img/landing/cards/pink rectangle.png" alt="trapezium" class="md:w-[570px] md:h-[310px]" />
                
                <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] lg:w-[50%] md:w-[70%] w-full px-4 flex flex-col lg:gap-3 gap-1">
                    <div class="flex flex-col items-center">
                        <img src='/img/landing/cards/rocket.png' alt='rocket' class='h-[25px] md:h-full'>
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

<style>
    @media screen and (min-height: 600px) {
        .translate-y-custom {
        transform: translateY(-5%);
        }
    }

    @media screen and (min-height: 800px) {
        .translate-y-custom {
            transform: translateY(-10%);
        }
    }

    @media screen and (min-height: 1000px) {
        .translate-y-custom {
            transform: translateY(-15%);
        }
    }
</style>