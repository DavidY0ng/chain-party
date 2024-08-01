<script>
    import { Text } from '$lib/components/ui/text';
    import { t } from '$lib/i18n';
    import Roadmap from '$lib/components/page/landing/Roadmap.svelte';
    import Cards from '$lib/components/page/landing/Cards.svelte';
    import Community from '$lib/components/page/landing/Community.svelte';
    import Footer from '$lib/components/layout/LandingPage/Footer.svelte';
</script>

<div class="flex flex-col gap-5">
    <div class="bg-gray-500 h-[400px] w-[600px]">
        <img src='' class='' alt='chain_party_mascot'>
    </div>

    <div class="bg-gray-500 h-[100px] w-[600px]">
        <img src='' alt="chain_party_logo">
    </div>

    <div class="bg-gray-500 h-[100px] w-[600px]">
        <img src='' alt="investor_logo">
    </div>
</div>

<div class="flex flex-col items-center mt-[150px] mb-[50px]">
    <Text size='3xl'>
        What is Chain Party?
    </Text>
    <Text size='xl'>
        Where Fun Meets Fair Play
    </Text>
</div>

<!-- card section -->
<div>
    <Cards />
</div>

<!-- mascot image -->
<div class="flex flex-col gap-5 mt-[100px] mb-[200px]">
    <div class="bg-gray-500 h-[400px] w-[600px]">
        <img src='' class='' alt='chain_party_mascot'>
    </div>
</div>

<!-- incubator -->
<div class="flex flex-col items-center mb-20">
    <div class="mb-20">
        <Text size='3xl'>
            INCUBATOR
        </Text>
    </div>
    
    <div class="bg-gray-500 h-[100px] w-[300px]">
        <img src='' class='' alt='EIC_Lab_Logo'>
    </div>
</div >

<!-- ecosystem partners -->
<div class="flex flex-col gap-5 items-center pb-[200px]">
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

<!-- roadmap -->
<div class='mb-[200px]'>
    <Roadmap />
</div>

<!-- join community -->
<div class='mb-[100px]'>
    <Community />
</div>

<!-- chain party mascot  -->
<div class="flex flex-col items-center gap-5">
    <div class="flex gap-5">
        {#each Array(16) as _ ,i}
            <div class="bg-gray-500 h-[60px] w-[60px]">
                <img src='' class='' alt='mascot'>
            </div>
        {/each}
    </div>
    <div class="flex gap-5 mb-5">
        {#each Array(17) as _ ,i}
            <div class="bg-gray-500 h-[60px] w-[60px]">
                <img src='' class='' alt='mascot'>
            </div>
        {/each}
    </div>

    <Text size='2xl'>
        170+ REGISTERED USERS
    </Text>
</div>

