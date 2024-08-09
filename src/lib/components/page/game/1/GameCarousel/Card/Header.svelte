<script lang="ts">
	import type { TGameRound } from '$lib/type/gameType';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';

	export let round: TGameRound['data'][0];
</script>

<div
	id="header"
	class="relative flex w-full items-center gap-x-3 {round.status === 'game_start'
		? 'bg-gradient-to-b from-[#711289] to-[#1C0632]'
		: round.status === 'awaiting'
			? 'bg-[#DF61FF]'
			: 'bg-[#444444]'}"
>
	<div
		class="w-fit {round.status === 'game_start'
			? 'bg-[#FF0099]'
			: round.status === 'awaiting'
				? 'bg-[#DF61FF]'
				: 'bg-black/20'} p-3"
	>
		<img src="/img/game/ticket.png" alt="" />
	</div>
	<div class="flex-1">
		<Text class="flex items-center gap-x-2 font-bold"
			>Game <span
				class="text-[12px] {round.status === 'game_start'
					? 'text-[#FF0099]'
					: round.status === 'awaiting'
						? 'text-black'
						: 'text-white/50'}">• {$t(`game.status.${round.status}`)} •</span
			></Text
		>
	</div>
	<div
		class="mr-3 rounded-full bg-black/20 px-3 text-md font-bold {round.status === 'game_start'
			? 'text-[#DF61FF]'
			: round.status === 'awaiting'
				? 'text-white'
				: 'text-white/50'}"
	>
		# {round.round_id}
	</div>
</div>
