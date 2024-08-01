<script>
    import TopNav from "$lib/components/layout/LandingPage/TopNav.svelte";
</script>

<div>
    <TopNav />
    <div class="flex flex-col mx-auto items-center p-10">
        <slot/>
    </div>
    
</div>