<script lang='ts'>
	import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';
	import Header from './header/Header.svelte';
	import RoadmapCard from './roadmap-card/RoadmapCard.svelte';
	import { isDesktop } from '$lib/stores/storeCommon';

	const roadmaps = [
		{
			year: '2024 Q1',
			description: [
				$t('landing.roadmap.2024_Q1.a'),
				$t('landing.roadmap.2024_Q1.b'),
				$t('landing.roadmap.2024_Q1.c'),
				$t('landing.roadmap.2024_Q1.d')
			]
		},
		{
			year: '2024 Q2',
			description: [$t('landing.roadmap.2024_Q2.a'), $t('landing.roadmap.2024_Q2.b')]
		},
		{
			year: '2024 Q3',
			description: [
				$t('landing.roadmap.2024_Q3.a'),
				$t('landing.roadmap.2024_Q3.b'),
				$t('landing.roadmap.2024_Q3.c'),
				$t('landing.roadmap.2024_Q3.d')
			]
		},
		{
			year: '2025 & 2026',
			description: [
				$t('landing.roadmap.2025-2026.a'),
				$t('landing.roadmap.2025-2026.b'),
				$t('landing.roadmap.2025-2026.c')
			]
		}
	];

	const planets = ['1','2', '3', '4']
	const rings = ['1','2', '3', '4']
	const planetTranslationsX = ['10%', '17%', '15%', '45%'];
	const planetTranslationsY = ['50%', '50%', '50%', '40%'];

</script>

<div class="flex flex-col relative items-center w-full">
    <Header title={$t('landing.roadmap.title')}></Header>
    <div class="w-full max-w-6xl px-4">
		<!-- desktop view -->

			<div class="hidden lg:grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-[100px] relative">
				{#each rings as ring, index}
					<div class="relative flex flex-col items-center justify-center">
						<!-- Mobile View -->
						<div class="block md:hidden">
							<div class="mb-4">
								<RoadmapCard roadmap={roadmaps[index]} />
							</div>
						</div>

						<!-- Desktop View -->
						{#if index % 2 === 0}
							<div class="hidden md:block absolute top-0 z-10 left-[13%]">
								<RoadmapCard roadmap={roadmaps[index]} />
							</div>
						{/if}
						<div class="relative md:h-full">
							<img src='/img/landing/roadmap/rings/ring {ring}.png' alt='ring' class="w-full h-auto">
							{#if planets[index]}
								<div class="absolute inset-0 flex items-center justify-end" style="transform: translateX({planetTranslationsX[index]})">
									<img src='/img/landing/roadmap/planets/planet {planets[index]}.png' alt='planet'>
								</div>
							{/if}
						</div>
						{#if index % 2 !== 0}
							<div class="hidden md:block absolute bottom-0 z-10 left-[18%]">
								<RoadmapCard roadmap={roadmaps[index]} />
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class='lg:hidden flex flex-col'>
				{#each rings as ring, index}
					<div class=" flex flex-col items-center">
						<!-- Mobile View -->
						<div class="lg:hidden flex flex-col w-full items-center">
							<div class='w-full relative flex flex-col items-center my-5'>
								<img src='/img/landing/roadmap/rings/rotated/ring {ring} 90.png' alt='ring' class="w-auto object-cover">
								<img src='/img/landing/roadmap/planets/planet {planets[index]}.png' alt='planet' class='absolute bottom-0' style="transform: translateY({planetTranslationsY[index]})">
							</div>
							
							<div class="">
								<RoadmapCard roadmap={roadmaps[index]} />
							</div>
							
							
						</div>
					</div>
				{/each}
			</div>

    </div>
</div>


