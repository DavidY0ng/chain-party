<script>
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import { isComingSoon } from '$lib/stores/storeCommon';
	import Roadmap from '$lib/components/page/landing/Roadmap.svelte';
	import Cards from '$lib/components/page/landing/Cards.svelte';
	import Community from '$lib/components/page/landing/Community.svelte';
	import Footer from '$lib/components/layout/LandingPage/Footer.svelte';
	import Intro from '$lib/components/page/landing/Intro.svelte';
	import Ecosystem from '$lib/components/page/landing/Ecosystem.svelte';
	import ChainPartyMascots from '$lib/components/page/landing/ChainPartyMascots.svelte';
	import ComingSoon from '$lib/components/page/landing/ComingSoon.svelte';
</script>

<!-- coming soon page can be control at store common -->
{#if $isComingSoon}
	<ComingSoon />
{:else}
	<!-- landing page -->
	<div class="w-full flex justify-center">
		<Intro />
	</div>
	<div class=" mt-[150px]">
		<Cards />
	</div>
	<!-- mascot image -->
    <div class='w-full flex justify-center'>
        <div class="flex flex-col items-center gap-5 mt-[100px] mb-[200px] w-full">
            <div class="bg-gray-500 h-[400px] xl:w-[600px] w-full">
                <img src="" class="" alt="chain_party_mascot" />
            </div>
        </div>
    </div>
	
	<!-- incubator -->
	<div class="flex flex-col items-center mb-20">
		<div class="mb-20">
			<Text size="3xl">INCUBATOR</Text>
		</div>

		<div class="bg-gray-500 h-[100px] w-[300px]">
			<img src="" class="" alt="EIC_Lab_Logo" />
		</div>
	</div>
	<div class="mb-[200px]">
		<Ecosystem />
	</div>
	<div class="mb-[200px]">
		<Roadmap />
	</div>
	<div class="mb-[100px]">
		<Community />
	</div>
	<div class="mb-[80px]">
		<ChainPartyMascots />
	</div>
{/if}
