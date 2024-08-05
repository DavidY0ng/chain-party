<script lang="ts">
	import Pageheader from '$lib/components/layout/PageHeader/PageHeader.svelte';
	import SideMenu from '$lib/components/layout/SideMenu.svelte';
	import TopMenu from '$lib/components/layout/TopMenu.svelte';
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
</script>

<Nprogress />
<Toaster />
<div
	id="mainContainer"
	class="flex h-full w-full flex-grow bg-gradient-to-br from-[#29193D] to-[#480A46]"
>
	<SideMenu />
	<div class="relative flex h-full w-full flex-col xl:w-[85%]">
		<TopMenu />
		<div class="flex flex-grow flex-col items-center overflow-y-scroll p-3 xl:p-10 xl:pt-[90px]">
			<Pageheader />
			<slot />
		</div>
	</div>
</div>
