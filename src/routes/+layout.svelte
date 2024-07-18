<script lang="ts">
	import SideMenu from '$lib/components/SideMenu.svelte';
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
	import '../app.postcss';
</script>

<div class="w-full h-full relative z-10 overflow-hidden transition">
	<Nprogress />
	<div class="flex w-full">
		<SideMenu />
		<div class="w-full xl:w-[85%]">
			<slot />
		</div>
	</div>
	<Toaster />
</div>
