<script lang="ts">
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
	import '../app.postcss';
</script>

<div class="w-full h-full relative z-10 overflow-x-hidden transition">
	<Nprogress />
	<slot />
	<Toaster />
</div>
