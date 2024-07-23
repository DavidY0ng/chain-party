<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	import Treeview from '$lib/components/ui/treeview/Treeview.svelte';
	import { storeUserInfo } from '$lib/stores/storeUser';
	export let data;
	$: ({ downlineList } = data);
</script>

<div class="h-full w-full min-h-screen space-y-10">
	<Text size="xl">Your Referral: {$storeUserInfo.referral_code}</Text>
	<div class="w-full">
		<Text size="xl">Your Team:</Text>
		<!-- Use the key to force rerendering -->
		<Treeview bind:tree={downlineList} />
	</div>
</div>
