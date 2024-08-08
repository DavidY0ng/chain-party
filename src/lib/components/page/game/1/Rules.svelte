<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Text } from '$lib/components/ui/text';
</script>

<div id="Game Rules" class="relative w-full">
	<Card.Root class="overflow-hidden rounded-lg border-none">
		<Card.Header
			class="gradient-border-bottom rulesHeader w-fit flex-row items-center gap-x-2  bg-[#481555] px-7 py-4 pr-10"
		>
			<img src="/img/game/gamerules.png" class="mt-1 h-5 w-5" alt="" />
			<Text class="font-bold">Game Rules</Text>
		</Card.Header>
		<Card.Content class="h-full w-full bg-black/20 py-8">
			<Text
				>Lorem ipsum dolor sit amet consectetur. Dui morbi leo sed fermentum ipsum facilisis
				tortor tincidunt. Eget massa metus commodo parturient sed tortor ipsum sem. Ornare
				ullamcorper eget velit sollicitudin viverra iaculis. Lorem vitae id arcu posuere eget
				bibendum felis. Augue cursus tincidunt quisque proin nisi. Id nibh orci vulputate at
				fermentum odio pretium vestibulum convallis. Vitae integer egestas orci ullamcorper
				facilisi dui. Turpis tempus eget faucibus faucibus mi massa integer tempus. Nunc aliquam
				aenean velit lorem.</Text
			>
		</Card.Content>
	</Card.Root>
</div>

<style>
	:global(.rulesHeader) {
		border-radius: 0px 60px 0px 0px / 0px 80px 0px 0px;
	}
</style>
