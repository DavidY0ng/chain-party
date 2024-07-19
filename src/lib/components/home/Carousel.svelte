<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Card from '$lib/components/ui/card';
	import Autoplay from 'embla-carousel-autoplay';
	import type { CarouselAPI } from '../ui/carousel/context';

	let api: CarouselAPI;
	let selectedIndex = 0;

	$: if (api) {
		selectedIndex = api.selectedScrollSnap();
		api.on('select', () => {
			selectedIndex = api.selectedScrollSnap();
		});
	}
</script>

<Carousel.Root
	bind:api
	plugins={[
		Autoplay({
			delay: 5000
		})
	]}
	class="w-full md:max-w-[90%]"
>
	<Carousel.Content class="-ml-1">
		{#each Array(5) as _, i (i)}
			<Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/3">
				<div class="p-1">
					<Card.Root>
						<Card.Content
							class="flex aspect-square items-center w-full justify-center h-[250px] p-6"
						>
							<span class="text-2xl font-semibold text-black">{i + 1}</span>
						</Card.Content>
					</Card.Root>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<div class="flex gap-x-1 absolute bottom-5 left-[50%] -translate-x-[50%] md:hidden">
		{#each Array(5) as _, i}
			<Carousel.Dot index={i} bind:selectedIndex />
		{/each}
	</div>
	<Carousel.Previous class="hidden md:flex" />
	<Carousel.Next class="hidden md:flex" />
</Carousel.Root>
