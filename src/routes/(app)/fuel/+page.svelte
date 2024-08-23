<script lang="ts">
	import ClaimAPI from '$lib/api/claim';
	import * as Claim from '$lib/components/page/claim/index';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Text } from '$lib/components/ui/text';
	import { isToken } from '$lib/stores/storeCommon';
	import type { TTotalClaimed } from '$lib/type/claimType';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
	import { t } from '$lib/i18n';
    import TotalReward from '$lib/components/page/fuel/TotalReward.svelte';
	import Rocket from '$lib/components/page/fuel/Rocket.svelte';



	onMount(() => {
		if ($isToken === undefined) return;
		
	});
</script>

<div in:fade class="relative h-full min-h-screen w-full px-4 xl:px-0">
	<div class="relative m-auto w-full max-w-[1400px] space-y-20 pt-[20px] md:pt-[40px]">
		<Rocket />
		<TotalReward />
	</div>
</div>
