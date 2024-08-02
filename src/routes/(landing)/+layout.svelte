<script lang='ts'>
    import TopNav from "$lib/components/layout/LandingPage/TopNav.svelte";
    import Footer from "$lib/components/layout/LandingPage/Footer.svelte";
    import { isComingSoon } from "$lib/stores/storeCommon";
</script>

<div class="h-full flex flex-col flex-grow">
    <TopNav />
    <div class="overflow-y-scroll flex flex-col flex-grow {$isComingSoon? 'justify-center': ''}">
        <div class='flex flex-col items-center xl:p-10'>
            <slot/>
        </div>
        {#if !$isComingSoon}
        <Footer />
        {/if}
    </div>
    
</div>