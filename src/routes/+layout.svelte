<script lang="ts">
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import TopMenu from '$lib/components/TopMenu.svelte';
	import '../app.postcss';
</script>

<div class="w-full h-full relative z-10 overflow-x-hidden transition">
	<Nprogress />

	<TopMenu />
	<div class="flex">
		<SideMenu />
		<slot />
	</div>

	<Toaster />
</div>
