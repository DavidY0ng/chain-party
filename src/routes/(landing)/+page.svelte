<script lang="ts">
	import Cards from '$lib/components/page/landing/Cards.svelte';
	import ChainPartyMascots from '$lib/components/page/landing/ChainPartyMascots.svelte';
	import ComingSoon from '$lib/components/page/landing/ComingSoon.svelte';
	import Community from '$lib/components/page/landing/Community.svelte';
	import Intro from '$lib/components/page/landing/Intro.svelte';
	import Roadmap from '$lib/components/page/landing/Roadmap.svelte';
	import Mascot from '$lib/components/page/landing/Mascot.svelte';
	import Incubator from '$lib/components/page/landing/Incubator.svelte';
	import { isComingSoon } from '$lib/stores/storeCommon';
</script>

<!-- coming soon page can be control at store common -->
{#if $isComingSoon}
	<div class="flex w-full justify-center">
		<ComingSoon />
	</div>
{:else}
	<!-- landing page -->
	<div class="w-full flex justify-center">
		
		<Intro />
	</div>
	<div class=" w-full">
		<Cards />
	</div>
	<!-- mascot image -->
	<div class="flex w-full justify-center">
		<Mascot />
	</div>

	<!-- incubator -->
	<div class="mb-20 flex flex-col items-center w-full">
		<Incubator />
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
