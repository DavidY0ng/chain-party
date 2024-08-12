<script lang="ts">
	import Cards from '$lib/components/page/landing/Cards.svelte';
	import ChainPartyMascots from '$lib/components/page/landing/ChainPartyMascots.svelte';
	import ComingSoon from '$lib/components/page/landing/ComingSoon.svelte';
	import Community from '$lib/components/page/landing/Community.svelte';
	import Ecosystem from '$lib/components/page/landing/Ecosystem.svelte';
	import Intro from '$lib/components/page/landing/Intro.svelte';
	import Roadmap from '$lib/components/page/landing/Roadmap.svelte';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
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
		<div class="mb-[200px] mt-[100px] flex w-full flex-col items-center gap-5">
			<div class="h-[400px] w-full max-w-[600px] bg-gray-500">
				<img src="" class="" alt="chain_party_mascot" />
			</div>
		</div>
	</div>

	<!-- incubator -->
	<div class="mb-20 flex flex-col items-center">
		<div class="mb-20">
			<Text size="3xl">{$t('landing.incubator')}</Text>
		</div>

		<div class="h-[100px] w-[300px] bg-gray-500">
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
