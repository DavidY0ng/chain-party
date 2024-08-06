<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	import * as Card from '$lib/components/ui/card';
	import { t } from '$lib/i18n';
</script>

<div id="Game Rules" class="space-y-10">
	<div id="title" class="space-y-5">
		<Text size="3xl" class="w-full text-center font-bold">{$t('game.how_to_play')}</Text>
		<Text size="lg" class="w-full text-center font-bold"
			>{$t('game.play_info')} <br />{$t('game.simple')}!</Text
		>
	</div>

	<div id="Steps" class="flex flex-col gap-5 md:flex-row">
		<Card.Root class="w-full p-5">
			<Text class="w-full text-right font-bold">{$t('game.step')} 1</Text>
			<Text size="2xl" class="font-bold">{$t('game.buy_tickets')}</Text>
			<Text size="lg">{$t('game.step_1_info')}</Text
			>
		</Card.Root>
		<Card.Root class="w-full p-5">
			<Text class="w-full text-right font-bold">{$t('game.step')} 2</Text>
			<Text size="2xl" class="font-bold">{$t('game.wait_for_the_draw')}</Text>
			<Text size="lg">{$t('game.step_2_info')}</Text>
		</Card.Root>
		<Card.Root class="w-full p-5">
			<Text class="w-full text-right font-bold">{$t('game.step')} 3</Text>
			<Text size="2xl" class="font-bold">{$t('game.check_for_the_prizes')}</Text>
			<Text size="lg"
				>{$t('game.step_3_info')}</Text
			>
		</Card.Root>
	</div>
	<hr />
	<div id="Winning Criteria" class="space-y-4">
		<Text size="4xl" class="font-bold">{$t('game.winning_criteria')}</Text>
		<Text size="2xl" class="font-bold"
			>{$t('game.criteria_info_0')}</Text
		>
		<Text size="lg">{$t('game.criteria_info_1')}</Text>
		<ul class="ml-2 text-lg text-black">
			<li>
				{$t('game.criteria_info_2')}
			</li>
			<li>
				{$t('game.criteria_info_3')}
			</li>
		</ul>
		<Text size="lg"
			>{$t('game.criteria_info_4')}</Text
		>
	</div>
	<hr />
	<div id="Prize Funds" class="space-y-4">
		<Text size="4xl" class="font-bold">{$t('game.prize_funds')}</Text>
		<Text size="lg" class="">{$t('game.prize_funds_info')}:</Text>
		<Text size="2xl" class="font-bold">{$t('game.ticket_purchases')}</Text>
		<ul class="ml-2 text-lg text-black">
			<li>
				{$t('game.ticket_purchases_info')}
			</li>
		</ul>
		<Text size="2xl" class="font-bold">{$t('game.rollover_prizes')}</Text>
		<ul class="ml-2 text-lg text-black">
			<li>
				{$t('game.rollover_prizes_info')}
			</li>
		</ul>
		<Text size="2xl" class="font-bold">CAKE {$t('game.injections')}</Text>
		<ul class="ml-2 text-lg text-black">
			<li>
				{$t('game.injection_info')}
			</li>
		</ul>
	</div>
	<hr />
</div>

<style>
	li::before {
		content: '•';
		margin-right: 4px;
	}
</style>
