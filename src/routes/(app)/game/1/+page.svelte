<script lang="ts">
	import * as Game from '$lib/components/page/game/1/index';
	import { Text } from '$lib/components/ui/text';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { fade } from 'svelte/transition';
	import { zeroAddress } from 'viem';
</script>

<div in:fade class="relative z-20 m-auto h-full min-h-screen w-full">
	<div class="relative m-auto w-full max-w-[1400px] space-y-20 pt-[100px]">
		<div class="space-y-5">
			<div class="relative z-10 mx-auto flex w-fit items-center">
				<img src="/img/game/left.png" alt="" />
				<Text size="3xl" class="font-bold ">
					PARTY CHAIN <span class="text-[#ff0099]">LUCKY</span> DRAW!
				</Text>
				<img src="/img/game/right.png" alt="" />
			</div>

			<Game.GameCarousel />
		</div>
		<Game.Reward />

		{#if $storeUserInfo.web3_address !== zeroAddress}
			<Game.Slot />
		{/if}

		<Game.Rules />
	</div>
</div>
