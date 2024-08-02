<script lang="ts">
	import type { TDashboardGame } from '$lib/api/dashboard';
	import DashboardAPI from '$lib/api/dashboard';
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import type { CarouselAPI } from '../../ui/carousel/context';
	import { onMount } from 'svelte';
	import { isToken, rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

	let api: CarouselAPI,
		selectedIndex: number = 0,
		gameList: TDashboardGame[] = [];

	$: if (api) {
		selectedIndex = api.selectedScrollSnap();
		api.on('select', () => {
			selectedIndex = api.selectedScrollSnap();
		});
	}

	async function getGameListing() {
		if ($isToken === undefined) return;
		const result = await DashboardAPI.game.getList();

		if (result.success) {
			gameList = result.data;
		} else {
			throw new Error(`Failed to fetch dashboard game list`);
		}
	}

	storeUserInfo.subscribe(async (value) => {
		if (value.web3_address !== zeroAddress) {
			await getGameListing();
		}
		rerender.set(!$rerender);
	});

	onMount(async () => {
		await getGameListing();
	});
</script>

{#key $rerender}
	<Carousel.Root
		bind:api
		plugins={[
			Autoplay({
				delay: 5000
			})
		]}
		class="w-full md:max-w-[90%]"
	>
		<Carousel.Content class="-ml-1 transition">
			{#if gameList.length > 0}
				{#each gameList as game, i (i)}
					<Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/3">
						<div class="p-1">
							<Card.Root>
								<Card.Content
									class="flex aspect-square h-[250px] w-full items-center justify-center overflow-hidden p-0"
								>
									<img src={game.image} class="h-full w-full" alt="" />
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			{:else}
				{#each Array(3) as _, i (i)}
					<Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/3">
						<div class="p-1">
							<Card.Root class="border-none">
								<Card.Content
									class="flex aspect-square h-[250px] w-full items-center justify-center overflow-hidden p-0"
								>
									<Skeleton class="h-full w-full" />
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			{/if}
		</Carousel.Content>

		<div class="absolute bottom-5 left-[50%] flex -translate-x-[50%] gap-x-1 md:hidden">
			{#each Array(5) as _, i}
				<Carousel.Dot index={i} bind:selectedIndex />
			{/each}
		</div>
		<Carousel.Previous class="hidden md:flex" />
		<Carousel.Next class="hidden md:flex" />
	</Carousel.Root>
{/key}
