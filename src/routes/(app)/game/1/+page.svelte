<script lang="ts">
	import * as Game from '$lib/components/page/game/1/index';
	import { Text } from '$lib/components/ui/text';
</script>

<div class="relative m-auto h-full min-h-screen w-full max-w-[1400px] space-y-20 pt-[100px]">
	<div class="space-y-5">
		<div class="relative z-10 mx-auto flex w-fit items-center">
			<img src="/img/game/left.png" alt="" />
			<Text size="3xl" class="font-bold "
				>PARTY CHAIN <span class="text-[#ff0099]">LUCKY</span> DRAW!</Text
			>
			<img src="/img/game/right.png" alt="" />
		</div>

		<Game.GameCarousel />
	</div>
	<Game.Reward />
</div>
