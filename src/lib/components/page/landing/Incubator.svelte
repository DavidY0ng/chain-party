<script lang='ts'>
    import { Text } from '$lib/components/ui/text';
    import { t } from '$lib/i18n';
    import Header from './header/Header.svelte';

    const partnersImg = ['spic', 'eic', 'bnb chain']
</script>

<div class="flex flex-col bg-with-opacity bg-no-repeat bg-cover w-full min-h-screen">
    <div class="container mx-auto px-4">
        <div class="flex flex-col gap-5 mb-[150px] pt-[100px]">
            <Header title={$t('landing.incubator')}></Header>
            <div class='flex justify-center'>
                <img src='/img/landing/incubator/eic labs.png' alt='eic labs'>
            </div>
        </div>
        
        <div class="flex flex-col items-center gap-[30px]">
            <Text size='3xl' class='pixel-font'>ECOSYSTEM PARTNERS</Text>
            <div class="grid grid-cols-3 gap-[40px]">
                {#each partnersImg as img}
                    <div class="bg-[#3C3A61]/60 rounded-md flex justify-center h-[100px] w-[400px] items-center">
                        <img src = '/img/landing/incubator/partners/{img}.png' alt='partners_img' class="h-[60px]">
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .bg-with-opacity {
        position: relative;
        width: 100%;
        min-height: 1000px;
    }
    
    .bg-with-opacity::before {
        content: "";
        background-image: url('/img/landing/incubator/background.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.3;
        z-index: -2; 
    }

    .bg-with-opacity::after {
        content: "";
        background: linear-gradient(360deg, #110F27 5%, rgba(17, 15, 39, 0) 12%, rgba(17, 15, 39, 0) 87.5%, #110F27 100%);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
    }
</style>