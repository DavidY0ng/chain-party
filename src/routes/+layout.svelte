<script lang="ts">
	import '../app.postcss';
	import { isComingSoon, showBindReferral } from '$lib/stores/storeCommon';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { browser } from '$app/environment';

	$: if ($isComingSoon && $page.url.pathname !== '/') {
		throw redirect(307, '/');
	}
</script>

<slot />
