<script lang='ts'>
    import '../app.postcss';
    import { isComingSoon } from '$lib/stores/storeCommon';
    import { page } from '$app/stores';
    import { redirect } from '@sveltejs/kit';

    $: if ($isComingSoon && $page.url.pathname !== '/') {
        throw redirect(307, '/');
    }
</script>

<slot/>
