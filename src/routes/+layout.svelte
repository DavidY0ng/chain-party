<script lang="ts">
	import Pageheader from '$lib/components/layout/PageHeader/PageHeader.svelte';
	import SideMenu from '$lib/components/layout/SideMenu.svelte';
	import TopMenu from '$lib/components/layout/TopMenu.svelte';
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
	import '../app.postcss';
	import { browser } from '$app/environment';
</script>

<Nprogress />
<Toaster />
<div id="mainContainer" class="flex h-full w-full flex-grow">
	<SideMenu />
	<div class="flex h-full w-full flex-col xl:w-[85%]">
		<TopMenu />
		<div class="flex flex-grow flex-col overflow-y-scroll p-3 xl:p-5">
			<Pageheader />
			<slot />
		</div>
	</div>
</div>
