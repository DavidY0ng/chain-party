<script lang='ts'>
	import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';

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

	$: console.log($t('landing.roadmap.2024_Q1.a'));
</script>

<div class="flex flex-col relative items-center">
	<div class="pb-10">
		<Text tag="h1" size="3xl">ROADMAP</Text>
	</div>
	<div class="bg-gray-300 relative p-10">
		<img
			src="/img/landing/roadmap/roadmap-bg.jpg"
			alt="roadmap-bg"
			class="absolute inset-0 w-full h-full object-cover"
		/>
		<div class="grid xl:grid-cols-2 gap-[100px] relative z-10">
			{#each roadmaps as roadmap}
				<div class="border xl:w-[500px] text-black">
			
					<ul class="list-disc pl-5">
						{#each roadmap.description as item}
							<li>{item}</li>
						{/each}
					</ul>
                    <div>
						{roadmap.year}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
