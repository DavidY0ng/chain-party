<script lang='ts'>
    import Text from '$lib/components/ui/text/text.svelte';
    import Icon from '@iconify/svelte';
    import Header from './header/Header.svelte';
    import { t } from '$lib/i18n';

    const links = [
        {link:'',icon:"ri:twitter-x-fill"},
        {link:'',icon:"lets-icons:insta"},
        {link:'',icon:"file-icons:telegram"},
        {link:'',icon:"ic:baseline-discord"},
    ]

</script>

<div class='relative flex flex-col items-center md:gap-10 mx-auto w-full'>
    <div class="star-background w-full">
        <div class="stars stars-1"></div>
        <div class="stars stars-2"></div>
        <div class="stars stars-3"></div>
    </div>
    
    <Header title={$t('landing.join_the_community')}></Header>

    <div class='relative flex flex-col items-center'>
        <div class='pink-eclipse blur-[150px] md:w-[550px] w-[350px]'></div>
        <div>
            <img src='/img/landing/community/mascot.png' alt='mascot' class='h-[300px] md:h-full'>
        </div>
        <!-- desktop view -->
        <div class="lg:flex justify-center gap-10 hidden">
            <a href='/hello' target="_blank" class='absolute top-[20%] translate-x-[-150px] left-0 text-white pink-circle rounded-full flex items-center justify-center hover:scale-105'>
                <Icon icon="ri:twitter-x-fill" width="2.5em" height="2.5em" />
            </a>
            <a href='/hello' target="_blank" class='absolute top-[30%] translate-x-[150px] right-0 text-white pink-circle rounded-full flex items-center justify-center hover:scale-105'>
                <Icon icon="lets-icons:insta" width="3em" height="3em" />
            </a>
            <a href='/hello' target="_blank" class='absolute bottom-[30%] translate-x-[-150px] left-20 text-white pink-circle rounded-full flex items-center justify-center hover:scale-105'>
                <Icon icon="file-icons:telegram" width="2.5em" height="2.5em" />
            </a>
            <a href='/hello' target="_blank" class='absolute bottom-[20%] translate-x-[150px] right-20 text-white pink-circle rounded-full flex items-center justify-center hover:scale-105'>
                <Icon icon="ic:baseline-discord" width="3em" height="3em" />
            </a>
        </div>
        <!-- mobile view -->
        <div class="lg:hidden justify-center flex gap-3 my-5">
            <a href='/hello' target="_blank" class=' text-white pink-circle rounded-full flex items-center justify-center hover:scale-105'>
                <Icon icon="ri:twitter-x-fill" width="2em" height="2em" />
            </a>
            <a href='/hello' target="_blank" class=' text-white pink-circle rounded-full flex items-center justify-center hover:scale-105'>
                <Icon icon="lets-icons:insta" width="2.5em" height="2.5em" />
            </a>
            <a href='/hello' target="_blank" class=' text-white pink-circle rounded-full flex items-center justify-center hover:scale-105'>
                <Icon icon="file-icons:telegram" width="2em" height="2em" />
            </a>
            <a href='/hello' target="_blank" class=' text-white pink-circle rounded-full flex items-center justify-center hover:scale-105'>
                <Icon icon="ic:baseline-discord" width="2.5em" height="2.5em" />
            </a>
        </div>
            
        <Text size='3xl' class='pixel-font text-center md:translate-y-[-20px] px-1'>170+ Registered Users</Text>
    </div>
    

 
</div>

<style>
    .pink-circle {
        width: 94px;
        height: 94px;
        border-radius: 50%;
        box-shadow: 0px -8px 4px 0px #00000040 inset;
        background: linear-gradient(180deg, #EC05F8 0%, #9723DE 100%);
        z-index: 10;
    }

    @media (max-width: 768px) {
        .pink-circle {
            width: 70px;
            height: 70px;
        }

    }

    
    .pink-eclipse {
        position: absolute;
        height: auto;
        aspect-ratio: 1;
        border-radius: 50%;
        opacity: 0.5;
        transform: translateZ(0);
        background-color: #833AC1;
        z-index: -1;
    }

    .star-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background: #110F27;
        overflow: hidden;
    }

    .stars {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 2px),
            radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 1px),
            radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 2px),
            radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 2px);
        background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
        background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
        opacity: 0.3;
    }

    .stars-1 {
        animation: twinkle 10s linear infinite, move-1 200s linear infinite;
    }

    .stars-2 {
        animation: twinkle 15s linear infinite, move-2 250s linear infinite;
    }

    .stars-3 {
        animation: twinkle 20s linear infinite, move-3 300s linear infinite;
    }

    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }

    @keyframes move-1 {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
    }

    @keyframes move-2 {
        0% { transform: rotate(0deg) scale(1.2); }
        50% { transform: rotate(-180deg) scale(0.8); }
        100% { transform: rotate(-360deg) scale(1.2); }
    }

    @keyframes move-3 {
        0% { transform: rotate(0deg) scale(0.8); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(0.8); }
    }
</style>