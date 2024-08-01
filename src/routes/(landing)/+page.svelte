<script>
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import Roadmap from '$lib/components/page/landing/Roadmap.svelte';
	import Cards from '$lib/components/page/landing/Cards.svelte';
	import Community from '$lib/components/page/landing/Community.svelte';
	import Footer from '$lib/components/layout/LandingPage/Footer.svelte';
	import Intro from '$lib/components/page/landing/Intro.svelte';
	import Ecosystem from '$lib/components/page/landing/Ecosystem.svelte';
	import ChainPartyMascots from '$lib/components/page/landing/ChainPartyMascots.svelte';
</script>

<div>
	<Intro />
</div>

<div class=" mt-[150px]">
	<Cards />
</div>

<!-- mascot image -->
<div class="flex flex-col gap-5 mt-[100px] mb-[200px]">
	<div class="bg-gray-500 h-[400px] w-[600px]">
		<img src="" class="" alt="chain_party_mascot" />
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

<div>
	<ChainPartyMascots />
</div>
