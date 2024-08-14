<script lang="ts">
	import Cards from '$lib/components/page/landing/Cards.svelte';
	import Community from '$lib/components/page/landing/Community.svelte';
	import Intro from '$lib/components/page/landing/Intro.svelte';
	import Roadmap from '$lib/components/page/landing/Roadmap.svelte';
	import Mascot from '$lib/components/page/landing/Mascot.svelte';
	import Incubator from '$lib/components/page/landing/Incubator.svelte';
</script>

<!-- landing page -->
<div class="flex w-full justify-center">
	<Intro />
</div>
<div class="mb-[200px] w-full">
	<Cards />
</div>
<!-- mascot image -->
<div class="mb-[200px] flex w-full justify-center">
	<Mascot />
</div>

<!-- incubator -->
<div class="mb-[200px] flex w-full flex-col items-center">
	<Incubator />
</div>

<div class="mb-[200px]">
	<Roadmap />
</div>
<div class="mb-[100px] w-full">
	<Community />
</div>
