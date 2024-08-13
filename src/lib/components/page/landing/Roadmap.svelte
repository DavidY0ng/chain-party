<script lang='ts'>
	import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';
	import Header from './header/Header.svelte';
	import RoadmapCard from './roadmap-card/RoadmapCard.svelte';

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
	const planetTranslations = ['10%', '17%', '15%', '45%'];

</script>

<div class="flex flex-col relative items-center">
    <Header title={$t('landing.roadmap.title')}></Header>
    <div class="w-full max-w-6xl px-4">
        <div class="grid grid-cols-4 gap-[100px] relative">
            {#each rings as ring, index}
                <div class="relative flex flex-col items-center justify-center">
                    {#if index % 2 === 0}
                        <div class="absolute top-0 z-10 left-[13%]">
                            <RoadmapCard roadmap={roadmaps[index]} />
                        </div>
                    {/if}
                    <div class="relative">
                        <img src='/img/landing/roadmap/rings/ring {ring}.png' alt='ring' class="w-full h-auto">
                        {#if planets[index]}
                            <div class="absolute inset-0 flex items-center justify-end" style="transform: translateX({planetTranslations[index]})">
                                <img src='/img/landing/roadmap/planets/planet {planets[index]}.png' alt='planet' class="">
                            </div>
                        {/if}
                    </div>
                    {#if index % 2 !== 0}
                        <div class="absolute bottom-0 z-10 left-[18%]">
                            <RoadmapCard roadmap={roadmaps[index]} />
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>

