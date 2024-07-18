<script lang="ts">
	import SideMenu from '$lib/components/layout/SideMenu.svelte';
	import TopMenu from '$lib/components/layout/TopMenu.svelte';
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
	import '../app.postcss';
</script>

<div class="w-full h-full flex flex-col relative z-10 transition">
	<Nprogress />
	<Toaster />
	<div class="flex flex-grow">
		<SideMenu />
		<div class="w-full xl:w-[85%] flex flex-col">
			<TopMenu />
			<div class="flex-grow overflow-y-auto">
				<slot />
			</div>
		</div>
	</div>
</div>
