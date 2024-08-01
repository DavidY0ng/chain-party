<script>
    import TopNav from "$lib/components/layout/LandingPage/TopNav.svelte";
    import Footer from "$lib/components/layout/LandingPage/Footer.svelte";
</script>

<div class="h-full flex flex-col flex-grow">
    <TopNav />
    <div class="overflow-y-scroll ">
        <div class='flex flex-col items-center p-10'>
            <slot/>
        </div>
        <Footer />
    </div>
    
</div>