<script lang="ts">
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import '../app.postcss';
</script>

<div class="w-full h-full min-h-screen relative z-10 transition">
	<Nprogress />
	<div class='flex'>
		<SideMenu />
		<slot />
	</div>

	<Toaster />
</div>
