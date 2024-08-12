<script lang='ts'>
    import TopNav from "$lib/components/layout/LandingPage/TopNav.svelte";
    import Footer from "$lib/components/layout/LandingPage/Footer.svelte";
	import { Toaster } from '$lib/components/ui/toast';
</script>

<Toaster />
<div class="h-full flex flex-col flex-grow bg-[#110F27]">
    <TopNav />
    <div class="overflow-y-scroll flex flex-col flex-grow">
        <div class='flex flex-col items-center'>
            <slot/>
        </div>
        <Footer />
    </div>
    
</div>